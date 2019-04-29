import React from 'react';
import Option from '../components/Option';
import {Mutation, MutationFn} from 'react-apollo';
import gql from 'graphql-tag';
import useErrors from '../_utils/useErrors';

interface OptionType {
  id: string;
  name: string;
  min: string;
  max: string;
  items: {name: string; price: string}[];
}

interface Props {
  option?: any;
  onCancel: any;
  onSave: any;
}
const UpsertOption = ({option = {}, onSave, onCancel}: Props) => {
  const [errors, setErrors, clearErrors] = useErrors();

  const isFormValid = (option: any) => {
    const {name, min, max, items} = option;

    let localErrors: [string, string][] = [];

    if (name.trim() === '') localErrors.push(['name', 'required']);

    if (max > items.length)
      localErrors.push([
        'choices',
        'Max cannot be greater than the number of items',
      ]);
    if (min > max)
      localErrors.push(['choices', 'Min cannot be greater than Max']);
    if (max === '0') localErrors.push(['choices', 'Max cannot be 0']);
    if (min.trim() === '') localErrors.push(['choices', 'Min is required']);
    if (max.trim() === '') localErrors.push(['choices', 'max is required']);
    if (min.trim() === '' && max.trim() === '')
      localErrors.push(['choices', 'Min and Max are required']);

    if (items.length === 0) localErrors.push(['items', 'required']);

    items.forEach(
      (optionItem: {name: string; price: string}, index: number) => {
        if (optionItem.name.trim() === '')
          localErrors.push([`option-item-name-${index}`, 'required']);
        if (optionItem.price.trim() === '')
          localErrors.push([`option-item-price-${index}`, 'required']);
      },
    );

    setErrors(localErrors);

    const isValid = localErrors.length === 0;

    return isValid;
  };

  const handleSave = (
    option: OptionType,
    createMenuItemOption: MutationFn<any, OptionType>,
  ) => {
    if (!isFormValid(option)) return;
    createMenuItemOption({
      variables: {...option},
    });
  };

  return (
    <Mutation
      mutation={CREATE_MENU_ITEM_OPTION}
      update={(_: any, {data: {createMenuItemOption}}: any) =>
        onSave(createMenuItemOption)
      }
      onError={() => {
        setErrors([['server-error', 'Something  went wrong, unable to save']]);
      }}
    >
      {(createMenuItemOption: any, {loading}: any) => {
        return (
          <Option
            saving={loading}
            option={option}
            errors={errors}
            clearErrors={clearErrors}
            onSave={(option: OptionType) =>
              handleSave(option, createMenuItemOption)
            }
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
    $min: String!
    $max: String!
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
