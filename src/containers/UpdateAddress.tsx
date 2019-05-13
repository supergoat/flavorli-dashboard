import React, {useState, useEffect} from 'react';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';
import useErrors from '../_utils/useErrors';
import Colours from '../Colours';

const UpdateAddress = ({
  previousAddress = {
    number: '',
    streetName: '',
    city: '',
    postalCode: '',
  },
  variables,
  mutation,
}: {
  previousAddress?: {
    number: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
  variables: {[key: string]: any};
  mutation: MutationFn<any, any>;
}) => {
  const [number, setNumber] = useState(previousAddress.number);
  const [streetName, setStreetName] = useState(previousAddress.streetName);
  const [city, setCity] = useState(previousAddress.city);
  const [postalCode, setPostalCode] = useState(previousAddress.postalCode);

  const [errors, setErrors, clearErrors] = useErrors();

  /**
   * Update address, when the address prop changes. This is needed when navigating
   * as the component does not re-render, therefore the address remains stale
   */
  useEffect(() => {
    setNumber(previousAddress.number);
    setStreetName(previousAddress.streetName);
    setCity(previousAddress.city);
    setPostalCode(previousAddress.postalCode);
  }, [
    previousAddress.number,
    previousAddress.streetName,
    previousAddress.city,
    previousAddress.postalCode,
  ]);

  const isFormValid = () => {
    let localErrors: [string, string][] = [];

    if (number.trim() === '') localErrors.push(['number', 'required']);
    if (streetName.trim() === '') localErrors.push(['streetName', 'required']);
    if (city.trim() === '') localErrors.push(['city', 'required']);
    if (postalCode.trim() === '') localErrors.push(['postalCode', 'required']);

    setErrors(localErrors);
    const isValid = localErrors.length === 0;

    return isValid;
  };

  const handleUpdate = (mutationFn: MutationFn<any, any>) => {
    if (!isFormValid()) return;

    mutationFn();
  };

  const hasBeenEdited =
    number !== previousAddress.number ||
    city !== previousAddress.city ||
    streetName !== previousAddress.streetName ||
    postalCode !== previousAddress.postalCode;

  return (
    <Mutation
      mutation={mutation}
      variables={{
        ...variables,
        address: {number, streetName, city, postalCode},
      }}
      onError={() => {
        setErrors([['server-error', 'Something went wrong, unable to save']]);
      }}
    >
      {(mutationFn: any, {loading}: any) => {
        return (
          <UpdateAddressWrapper hasBeenEdited={hasBeenEdited}>
            <AddressInput>
              <input
                value={number}
                onChange={(e: any) => {
                  clearErrors(['number']);
                  setNumber(e.target.value);
                }}
                placeholder="Number"
              />

              <AddressError show={errors.has('number')}>
                {errors.get('number')}
              </AddressError>
            </AddressInput>

            <AddressInput>
              <input
                value={streetName}
                onChange={(e: any) => {
                  clearErrors(['streetName']);
                  setStreetName(e.target.value);
                }}
                placeholder="Street Name"
              />

              <AddressError show={errors.has('streetName')}>
                {errors.get('streetName')}
              </AddressError>
            </AddressInput>

            <AddressInput>
              <input
                value={city}
                onChange={(e: any) => {
                  clearErrors(['city']);
                  setCity(e.target.value);
                }}
                placeholder="City"
              />

              <AddressError show={errors.has('city')}>
                {errors.get('city')}
              </AddressError>
            </AddressInput>

            <AddressInput>
              <input
                value={postalCode}
                onChange={(e: any) => {
                  clearErrors(['postalCode']);
                  setPostalCode(e.target.value);
                }}
                placeholder="Postal Code"
              />

              <AddressError show={errors.has('postalCode')}>
                {errors.get('postalCode')}
              </AddressError>
            </AddressInput>

            <AddressError show={errors.has('server-error')}>
              {errors.get('server-error')}
            </AddressError>

            <SaveAddress>
              <ConfirmButtons
                show={hasBeenEdited}
                saving={loading}
                onConfirm={() => handleUpdate(mutationFn)}
                onCancel={() => {
                  setErrors([]);
                  setNumber(previousAddress.number);
                  setStreetName(previousAddress.streetName);
                  setCity(previousAddress.city);
                  setPostalCode(previousAddress.postalCode);
                }}
              />
            </SaveAddress>
          </UpdateAddressWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateAddress;

interface UpdateAddressWrapperProps {
  hasBeenEdited?: boolean;
}
const UpdateAddressWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  input {
    color: ${(props: UpdateAddressWrapperProps) =>
      props.hasBeenEdited ? Colours.oxfordBlue : Colours.osloGrey};
    font-size: 20px;
    width: 100%;
    outline: none;
    border: none;
  }
`;

const SaveAddress = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const AddressInput = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

interface ErrorProps {
  show?: boolean;
}
const AddressError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;
