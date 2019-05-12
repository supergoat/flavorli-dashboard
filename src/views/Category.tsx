import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import Category from '../components/Category';

interface Props extends RouteComponentProps {
  categoryId?: string;
}

const CategoryView = ({categoryId}: Props) => {
  return (
    <Query query={GET_MENU_CATEGORY} variables={{categoryId}}>
      {({loading, error, data: {getCategory}}: any) => {
        if (loading) return 'Loading...';

        if (error) return `Error! ${error.message}`;

        return <Category category={getCategory} />;
      }}
    </Query>
  );
};

export default CategoryView;

export const CATEGORY_ITEMS = gql`
  fragment CategoryItems on MenuCategory {
    items {
      id
      name
      price
      image
      available
      description
      dietary
    }
  }
`;

const GET_MENU_CATEGORY = gql`
  query getCategory($categoryId: ID!) {
    getCategory(categoryId: $categoryId) {
      id
      name
      description
      ...CategoryItems
      menu {
        name
        id
      }
    }
  }
  ${CATEGORY_ITEMS}
`;
