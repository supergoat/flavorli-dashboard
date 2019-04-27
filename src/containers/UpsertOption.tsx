import React from 'react';
import Option from '../components/Option';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
  option: any;
  onCancel: any;
  onSave: any;
}

const UpsertOption = ({option, onSave, onCancel}: Props) => {
  return (
    <Mutation
      mutation={CREATE_MENU_ITEM_OPTION}
      update={(cache: any, {data: {createMenuItemOption}}: any) => {
        onSave(createMenuItemOption);
      }}
    >
      {(createMenuItemOption: any, {loading, error}: any) => {
        return (
          <Option
            option={option}
            onSave={createMenuItemOption}
            onCancel={onCancel}
          />
        );
      }}
    </Mutation>
  );
};

export default UpsertOption;

const CREATE_MENU_ITEM_OPTION = gql`
  mutation createMenuItemOption(
    $id: ID
    $name: String!
    $min: Int!
    $max: Int!
    $items: [OptionItemWhereInput!]!
  ) {
    createMenuItemOption(
      id: $id
      name: $name
      min: $min
      max: $max
      items: $items
    ) {
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
`;
