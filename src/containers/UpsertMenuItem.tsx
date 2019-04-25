import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import MenuItem from '../components/MenuItem';

interface Props extends RouteComponentProps {
  options: any;
  categoryId?: string;
  menuItem: any;
}
const UpsertMenuItem = ({options, categoryId, menuItem}: Props) => {
  return (
    <Mutation
      mutation={UPSERT_MENU_ITEM}
      onCompleted={() => navigate(`/menu-builder/category/${categoryId}`)}
    >
      {(addMenuItem: any, {loading, error}: any) => {
        return (
          <MenuItem
            categoryId={categoryId}
            menuItem={menuItem}
            options={options}
            onSave={addMenuItem}
          />
        );
      }}
    </Mutation>
  );
};

export default UpsertMenuItem;

const UPSERT_MENU_ITEM = gql`
  mutation addMenuItem(
    $categoryId: ID!
    $id: ID
    $name: String
    $price: Float
    $description: String
    $dietary: [String!]
    $options: [ID!]
  ) {
    addMenuItem(
      categoryId: $categoryId
      id: $id
      name: $name
      price: $price
      description: $description
      dietary: $dietary
      options: $options
    ) {
      id
      name
      description
      price
      dietary
      options {
        id
        name
        min
        max
        items {
          id
          name
          price
        }
      }
    }
  }
`;
