import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import gql from 'graphql-tag';
import {Mutation, MutationFn} from 'react-apollo';
import MenuItem from '../components/MenuItem';
import {CATEGORY_ITEMS} from '../views/Category';
import useErrors from '../_utils/useErrors';

interface MenuItemType {
  id: string;
  categoryId: string;
  name: string;
  price: string;
  available: boolean;
  description: string;
  dietary: string[];
  options: string[];
}
interface Props extends RouteComponentProps {
  options: any;
  categoryId?: string;
  menuItem: any;
}
const UpsertMenuItem = ({options, categoryId, menuItem}: Props) => {
  const [errors, setErrors, clearErrors] = useErrors();

  const isFormValid = (menuItem: MenuItemType) => {
    const {name, price} = menuItem;

    let localErrors: [string, string][] = [];

    if (price.trim() === '') {
      localErrors.push(['price', 'required']);
      const priceEl = document.getElementById('menu-item-price');

      if (priceEl) priceEl.scrollIntoView({behavior: 'smooth', block: 'end'});
    }

    if (name.trim() === '') {
      localErrors.push(['name', 'required']);
      const nameEl = document.getElementById('menu-item-name');

      if (nameEl) nameEl.scrollIntoView({behavior: 'smooth', block: 'end'});
    }

    setErrors(localErrors);

    const isValid = localErrors.length === 0;

    return isValid;
  };

  const handleSave = (
    menuItem: MenuItemType,
    upsertMenuItem: MutationFn<any, MenuItemType>,
  ) => {
    if (!isFormValid(menuItem)) return;
    upsertMenuItem({
      variables: {...menuItem},
    });
  };
  return (
    <Mutation
      mutation={UPSERT_MENU_ITEM}
      update={(cache: any, {data: {upsertMenuItem}}: any) => {
        if (!menuItem.id) {
          const {items} = cache.readFragment({
            id: `MenuCategory:${categoryId}`,
            fragment: CATEGORY_ITEMS,
          });

          cache.writeFragment({
            id: `MenuCategory:${categoryId}`,
            fragment: CATEGORY_ITEMS,
            data: {
              items: items ? [upsertMenuItem, ...items] : [upsertMenuItem],
              __typename: 'MenuCategory',
            },
          });
        }

        navigate(`/menu-builder/category/${categoryId}`);
      }}
    >
      {(upsertMenuItem: any, {loading, error}: any) => {
        return (
          <MenuItem
            categoryId={categoryId}
            menuItem={menuItem}
            options={options}
            onSave={(menuItem: MenuItemType) =>
              handleSave(menuItem, upsertMenuItem)
            }
            errors={errors}
            clearErrors={clearErrors}
          />
        );
      }}
    </Mutation>
  );
};

export default UpsertMenuItem;

const UPSERT_MENU_ITEM = gql`
  mutation upsertMenuItem(
    $categoryId: ID!
    $id: ID
    $name: String
    $price: String
    $available: Boolean!
    $description: String
    $dietary: [String!]
    $options: [ID!]
  ) {
    upsertMenuItem(
      categoryId: $categoryId
      id: $id
      name: $name
      price: $price
      available: $available
      description: $description
      dietary: $dietary
      options: $options
    ) {
      id
      name
      description
      price
      available
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
