import React from 'react';
import AddTime from '../components/AddTime';
import {Mutation, MutationFn} from 'react-apollo';
import gql from 'graphql-tag';
import useErrors from '../_utils/useErrors';
import {RESTAURANT_OPENING_TIMES_DATA} from '../views/MenuBuilder';

interface OpeningTimeType {
  id: string;
  openingDays: string[];
  openingHours: [string, string];
  restaurantId: string;
}

interface Props {
  openingTime?: any;
  onCancel: any;
  onSave: any;
}
const upsertOpeningTime = ({openingTime, onSave, onCancel}: Props) => {
  const [errors, setErrors, clearErrors] = useErrors();

  const isFormValid = ({openingHours, openingDays}: any) => {
    let localErrors: [string, string][] = [];

    setErrors(localErrors);

    const isValid = localErrors.length === 0;

    return isValid;
  };

  const handleSave = (
    openingTime: OpeningTimeType,
    upsertOpeningTime: MutationFn<any, OpeningTimeType>,
  ) => {
    if (!isFormValid(openingTime)) return;
    upsertOpeningTime({
      variables: {...openingTime},
    });
  };

  return (
    <Mutation
      mutation={UPSERT_OPENING_TIME}
      update={(cache: any, {data: {upsertOpeningTime}}: any) => {
        if (!openingTime.id) {
          const {openingTimes} = cache.readFragment({
            id: `Restaurant:${openingTime.restaurantId}`,
            fragment: RESTAURANT_OPENING_TIMES_DATA,
          });

          cache.writeFragment({
            id: `Restaurant:${openingTime.restaurantId}`,
            fragment: RESTAURANT_OPENING_TIMES_DATA,
            data: {
              openingTimes: openingTimes
                ? [...openingTimes, upsertOpeningTime]
                : [upsertOpeningTime],
              __typename: 'Restaurant',
            },
          });
        }

        onSave(upsertOpeningTime);
      }}
      onError={() => {
        setErrors([['server-error', 'Something  went wrong, unable to save']]);
      }}
    >
      {(upsertOpeningTime: any, {loading}: any) => {
        return (
          <AddTime
            saving={loading}
            addTime={openingTime}
            errors={errors}
            clearErrors={clearErrors}
            onSave={(openingTime: any) =>
              handleSave(openingTime, upsertOpeningTime)
            }
            onCancel={onCancel}
          />
        );
      }}
    </Mutation>
  );
};

export default upsertOpeningTime;

const UPSERT_OPENING_TIME = gql`
  mutation upsertOpeningTime($id: ID, $hours: [String!], $days: [String!]) {
    upsertOpeningTime(id: $id, hours: $hours, days: $days) {
      id
      hours
      days
    }
  }
`;
