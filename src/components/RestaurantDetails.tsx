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

const RestaurantDetails = ({restaurant}: Props) => {
  return (
    <RestaurantDetailsWrapper>
      <Cover>
        {restaurant.image ? (
          <RestaurantCoverImage
            src={restaurant.image}
            alt={`${restaurant.name} cover image`}
          />
        ) : (
          <SelectCoverImage>Preview Cover Image</SelectCoverImage>
        )}

        {restaurant.logo ? (
          <RestaurantLogo
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
          />
        ) : (
          <SelectRestaurantLogo>Preview Logo</SelectRestaurantLogo>
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
      <Label>Average Food Preparation Time</Label>
      <PreparationTime>
        <UpdateInput
          style={css`
            margin-bottom: 20px;
            width: 100%;
            input {
              font-size: 20px;
              width: 100%;
              padding: 8px 0;
            }
          `}
          validator={(input: number) => input < 100}
          name="averagePreparationTime"
          inputValue={restaurant.averagePreparationTime}
          variables={{restaurantId: restaurant.id}}
          mutation={UPDATE_RESTAURANT_AVERAGE_PREPARATION_TIME}
        />
        <p>minutes</p>
      </PreparationTime>

      <Label>Average Food Preparation Time When Busy</Label>
      <PreparationTime>
        <UpdateInput
          style={css`
            margin-bottom: 20px;
            width: 100%;
            input {
              font-size: 20px;
              width: 100%;
              padding: 8px 0;
            }
          `}
          validator={(input: number) => input < 100}
          name="averageBusyPreparationTime"
          inputValue={restaurant.averageBusyPreparationTime}
          variables={{restaurantId: restaurant.id}}
          mutation={UPDATE_RESTAURANT_AVERAGE_BUSY_PREPARATION_TIME}
        />
        <p>minutes</p>
      </PreparationTime>

      <OpeningTimeList
        restaurantId={restaurant.id}
        restaurantOpeningTimes={restaurant.openingTimes}
      />
    </RestaurantDetailsWrapper>
  );
};

export default RestaurantDetails;

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

const UPDATE_RESTAURANT_AVERAGE_PREPARATION_TIME = gql`
  mutation updateRestaurant(
    $restaurantId: ID!
    $averagePreparationTime: String
  ) {
    updateRestaurant(
      restaurantId: $restaurantId
      averagePreparationTime: $averagePreparationTime
    ) {
      id
      averagePreparationTime
    }
  }
`;

const UPDATE_RESTAURANT_AVERAGE_BUSY_PREPARATION_TIME = gql`
  mutation updateRestaurant(
    $restaurantId: ID!
    $averageBusyPreparationTime: String
  ) {
    updateRestaurant(
      restaurantId: $restaurantId
      averageBusyPreparationTime: $averageBusyPreparationTime
    ) {
      id
      averageBusyPreparationTime
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

const RestaurantDetailsWrapper = styled.div`
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

const SelectCoverImage = styled.h2`
  text-align: center;
`;

const RestaurantCoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RestaurantLogo = styled.img`
  position: absolute;
  bottom: -50px;
  right: 20px;
  height: 130px;
  width: 130px;
  border: 1px solid lightgrey;
  margin-bottom: 20px;
  background: ${Colours.white};
`;

const SelectRestaurantLogo = styled.h2`
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

const PreparationTime = styled.div`
  position: relative;
  display: flex;
  p {
    position: absolute;
    left: 30px;
    top: 10px;
  }
`;
