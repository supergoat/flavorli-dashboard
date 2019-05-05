import React from 'react';
import styled, {css} from 'styled-components/macro';
import gql from 'graphql-tag';
import UpdateInput from '../containers/UpdateInput';
import UpdateAddress from '../containers/UpdateAddress';

import Colours from '../Colours';

interface Props {
  restaurant: any;
}

const Account = ({restaurant}: Props) => {
  return (
    <AccountWrapper>
      <UpdateInput
        style={css`
          margin-bottom: 20px;
          input {
            font-size: 40px;
            font-weight: 300;
            width: 100%;
          }
        `}
        placeholder="Name"
        inputValue={restaurant.name}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_NAME}
      />

      <UpdateInput
        style={css`
          margin-bottom: 20px;
          textarea {
            font-size: 20px;
            width: 100%;
            line-height: 30px;
          }
        `}
        textarea
        textareaLineHeight={30}
        placeholder="Description"
        inputValue={restaurant.description}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_DESCRIPTION}
      />

      <UpdateAddress
        previousAddress={restaurant.address}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_ADDRESS}
      />

      <UpdateInput
        style={{
          fontSize: '20px',
          width: '100%',
        }}
        placeholder="Tel"
        inputValue={restaurant.tel}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_TEL}
      />
    </AccountWrapper>
  );
};

export default Account;

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  margin: 5px 0;
  width: 580px;
  background: ${Colours.white};
  padding: 10px 0;
`;

const UPDATE_RESTAURANT_NAME = gql`
  mutation updateRestaurant($restaurantId: ID!, $name: String) {
    updateRestaurant(restaurantId: $restaurantId, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_RESTAURANT_DESCRIPTION = gql`
  mutation updateRestaurant($restaurantId: ID!, $description: String) {
    updateRestaurant(restaurantId: $restaurantId, description: $description) {
      id
      description
    }
  }
`;

const UPDATE_RESTAURANT_ADDRESS = gql`
  mutation updateRestaurant($restaurantId: ID!, $address: AddressWhereInput) {
    updateRestaurant(restaurantId: $restaurantId, address: $address) {
      address {
        id
        number
        streetName
        city
        postalCode
      }
    }
  }
`;

const UPDATE_RESTAURANT_TEL = gql`
  mutation updateRestaurant($restaurantId: ID!, $tel: String) {
    updateRestaurant(restaurantId: $restaurantId, tel: $tel) {
      id
      tel
    }
  }
`;
