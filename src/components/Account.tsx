import React from 'react';
import styled, {css} from 'styled-components/macro';
import gql from 'graphql-tag';
import UpdateInput from '../containers/UpdateInput';
import UpdateAddress from '../containers/UpdateAddress';
import Label from '../ui/Label';
import Colours from '../Colours';
import OpeningTimeList from './OpeningTimeList';

interface Props {
  restaurant: any;
}

const Account = ({restaurant}: Props) => {
  return (
    <AccountWrapper>
      <Cover>
        {restaurant.image ? (
          <RestaurantCoverImage
            src={restaurant.image}
            alt={`${restaurant.name} cover image`}
          />
        ) : (
          <UploadText>
            <p>Cover</p>
            <span>(tap to select)</span>
          </UploadText>
        )}

        {restaurant.logo ? (
          <RestaurantLogo
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
          />
        ) : (
          <UploadText>
            <p>Logo</p>
            <span>(tap to select)</span>
          </UploadText>
        )}
      </Cover>

      <Label>Restaurant name</Label>

      <UpdateInput
        style={css`
          margin-bottom: 20px;
          input {
            font-size: 40px;
            font-weight: 300;
            width: 100%;
          }
        `}
        required
        name="name"
        placeholder="Name"
        inputValue={restaurant.name}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_NAME}
      />

      <Label>Restaurant cover image url</Label>
      <UpdateInput
        style={css`
          margin-bottom: 20px;
          textarea {
            font-size: 20px;
            width: 100%;
            line-height: 30px;
          }
        `}
        name="image"
        textarea
        textareaLineHeight={30}
        placeholder="Cover image url"
        inputValue={restaurant.image}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_IMAGE}
      />

      <Label>Restaurant logo url</Label>
      <UpdateInput
        style={css`
          margin-bottom: 20px;
          textarea {
            font-size: 20px;
            width: 100%;
            line-height: 30px;
          }
        `}
        name="logo"
        textarea
        textareaLineHeight={30}
        placeholder="logo image url"
        inputValue={restaurant.logo}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_LOGO}
      />

      <Label>Restaurant description</Label>

      <UpdateInput
        style={css`
          margin-bottom: 20px;
          textarea {
            font-size: 20px;
            width: 100%;
            line-height: 30px;
          }
        `}
        name="description"
        textarea
        textareaLineHeight={30}
        placeholder="Description"
        inputValue={restaurant.description}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_DESCRIPTION}
      />

      <Label>Restaurant address</Label>
      <UpdateAddress
        previousAddress={restaurant.address}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_ADDRESS}
      />

      <Label>Restaurant tel</Label>
      <UpdateInput
        style={css`
          margin-bottom: 10px;
          input {
            font-size: 20px;
            width: 100%;
            padding: 8px 0;
          }
        `}
        name="tel"
        placeholder="Tel"
        inputValue={restaurant.tel}
        variables={{restaurantId: restaurant.id}}
        mutation={UPDATE_RESTAURANT_TEL}
      />

      <OpeningTimeList
        restaurantId={restaurant.id}
        restaurantOpeningTimes={restaurant.openingTimes}
      />
    </AccountWrapper>
  );
};

export default Account;

const UPDATE_RESTAURANT_NAME = gql`
  mutation updateRestaurant($restaurantId: ID!, $name: String) {
    updateRestaurant(restaurantId: $restaurantId, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_RESTAURANT_IMAGE = gql`
  mutation updateRestaurant($restaurantId: ID!, $image: String) {
    updateRestaurant(restaurantId: $restaurantId, image: $image) {
      id
      image
    }
  }
`;

const UPDATE_RESTAURANT_LOGO = gql`
  mutation updateRestaurant($restaurantId: ID!, $logo: String) {
    updateRestaurant(restaurantId: $restaurantId, logo: $logo) {
      id
      logo
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

const Cover = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 30px;
  border: 1px solid lightgrey;
  background: ${Colours.white};
`;

const UploadText = styled.h2`
  text-align: center;
`;

const RestaurantCoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RestaurantLogo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -50px;
  right: 20px;
  height: 130px;
  width: 130px;
  border: 1px solid lightgrey;
  margin-bottom: 20px;
  background: ${Colours.white};
`;
