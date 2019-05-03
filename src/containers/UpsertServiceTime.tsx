import React from 'react';
import ServiceTime from '../components/ServiceTime';
import {Mutation, MutationFn} from 'react-apollo';
import gql from 'graphql-tag';
import useErrors from '../_utils/useErrors';
import {MENU_SERVICE_TIMES_DATA} from '../views/MenuBuilder';

interface ServiceTimeType {
  id: string;
  serviceDays: string[];
  serviceHours: [string, string];
  menuId: string;
}

interface Props {
  serviceTime?: any;
  onCancel: any;
  onSave: any;
}
const UpsertServiceTime = ({serviceTime, onSave, onCancel}: Props) => {
  const [errors, setErrors, clearErrors] = useErrors();

  const isFormValid = ({serviceHours, serviceDays}: any) => {
    let localErrors: [string, string][] = [];

    setErrors(localErrors);

    const isValid = localErrors.length === 0;

    return isValid;
  };

  const handleSave = (
    serviceTime: ServiceTimeType,
    upsertServiceTime: MutationFn<any, ServiceTimeType>,
  ) => {
    if (!isFormValid(serviceTime)) return;
    upsertServiceTime({
      variables: {...serviceTime},
    });
  };

  return (
    <Mutation
      mutation={UPSERT_SERVICE_TIME}
      update={(cache: any, {data: {upsertServiceTime}}: any) => {
        if (!serviceTime.id) {
          const {serviceTimes} = cache.readFragment({
            id: `Menu:${serviceTime.menuId}`,
            fragment: MENU_SERVICE_TIMES_DATA,
          });

          cache.writeFragment({
            id: `Menu:${serviceTime.menuId}`,
            fragment: MENU_SERVICE_TIMES_DATA,
            data: {
              serviceTimes: serviceTimes
                ? [...serviceTimes, upsertServiceTime]
                : [upsertServiceTime],
              __typename: 'Menu',
            },
          });
        }

        onSave(upsertServiceTime);
      }}
      onError={() => {
        setErrors([['server-error', 'Something  went wrong, unable to save']]);
      }}
    >
      {(upsertServiceTime: any, {loading}: any) => {
        return (
          <ServiceTime
            saving={loading}
            serviceTime={serviceTime}
            errors={errors}
            clearErrors={clearErrors}
            onSave={(serviceTime: any) =>
              handleSave(serviceTime, upsertServiceTime)
            }
            onCancel={onCancel}
          />
        );
      }}
    </Mutation>
  );
};

export default UpsertServiceTime;

const UPSERT_SERVICE_TIME = gql`
  mutation upsertServiceTime(
    $id: ID
    $menuId: ID!
    $hours: [String!]
    $days: [String!]
  ) {
    upsertServiceTime(id: $id, menuId: $menuId, hours: $hours, days: $days) {
      id
      hours
      days
    }
  }
`;
