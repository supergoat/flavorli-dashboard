import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps, navigate} from '@reach/router';
import Colours from '../Colours';
import SelectOption from '../components/SelectOption';
import Button from '../ui/Button';
import Error from '../ui/Error';
import Label from '../ui/Label';
import SelectDietaryItems from './SelectDietaryItems';
import DeleteMenuItemButton from '../containers/DeleteMenuItemButton';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';
import isValidPrice from '../_utils/isValidPrice';
import UpsertOption from '../containers/UpsertOption';

interface Props extends RouteComponentProps {
  categoryId?: string;
  menuItem: any;
  options: any;
  onSave: (arg: any) => void;
  errors: Map<string, string>;
  clearErrors: (errors: string[]) => void;
}
const MenuItem = ({
  categoryId,
  menuItem,
  options,
  onSave,
  errors,
  clearErrors,
}: Props) => {
  const textAreaEl: any = useRef();
  useEffect(() => calculateTextAreaRows({textAreaEl}));

  const [available, setAvailable] = useState(menuItem.available);
  const [name, setName] = useState(menuItem.name || '');
  const [price, setPrice] = useState(menuItem.price || '');
  const [description, setDescription] = useState(menuItem.description || '');
  const [dietarySelected, setDietarySelected] = useState(menuItem.dietary);
  const [selectedOptions, setSelectedOptions] = useState(menuItem.options);
  const [availableOptions, setAvailableOptions] = useState(options);
  const [isCreatingOption, setIsCreatingOption] = useState(false);
  const [editingOption, setIsEditingOption] = useState<any>(null);

  const handleDescriptionChange = (event: any) => {
    calculateTextAreaRows({textAreaEl});
    setDescription(event.target.value);
  };

  const handleSave = () => {
    onSave({
      id: menuItem.id,
      categoryId,
      name,
      price: price,
      available,
      description,
      dietary: dietarySelected,
      options: selectedOptions.map((o: any) => o.id),
    });
  };

  return (
    <MenuItemWrapper>
      <Availability
        available={available}
        onClick={() => setAvailable(!available)}
      >
        {available ? 'AVAILABLE' : 'UNAVAILABLE'}
      </Availability>

      <NameInput
        id="menu-item-name"
        value={name}
        onChange={e => {
          clearErrors(['name']);
          setName(e.target.value);
        }}
        placeholder="Name"
      />
      <MenuItemError show={errors.has('name')}>
        {errors.get('name')}
      </MenuItemError>

      <DescriptionTextArea
        ref={textAreaEl}
        id="description"
        onChange={handleDescriptionChange}
        value={description}
        placeholder="Description"
      />

      <Label htmlFor="price">Price</Label>
      <MenuItemError show={errors.has('price')}>
        {errors.get('price')}
      </MenuItemError>
      <Price>
        <input
          id="menu-item-price"
          value={price}
          onChange={(e: any) => {
            const str = e.target.value;
            clearErrors(['price']);
            if (isValidPrice(str)) setPrice(str);
          }}
        />
      </Price>

      <Label>Allergens</Label>

      <SelectDietaryItems
        selectedItems={dietarySelected}
        onSelect={item =>
          setDietarySelected((items: any) => {
            if (items.includes(item))
              return items.filter((i: any) => i !== item);
            return [...items, item];
          })
        }
      />

      <Label>Options</Label>
      <SelectOption
        availableOptions={availableOptions}
        onAdd={(option: any) => {
          setSelectedOptions([...selectedOptions, option]);
          setAvailableOptions(
            availableOptions.filter((o: any) => o.id !== option.id),
          );
        }}
      />

      <CreateOptionButton
        onClick={() => {
          setIsCreatingOption(true);
          setIsEditingOption(null);
        }}
      >
        CREATE OPTION +
      </CreateOptionButton>

      {isCreatingOption && (
        <CreatingOption>
          <UpsertOption
            onSave={(newOption: any) => {
              setSelectedOptions([...selectedOptions, newOption]);
              setIsCreatingOption(false);
            }}
            onCancel={() => setIsCreatingOption(false)}
          />
        </CreatingOption>
      )}

      <Options>
        {selectedOptions.map((option: any) => {
          return (
            <OptionListItem key={option.id}>
              {editingOption && editingOption.id === option.id ? (
                <UpsertOption
                  onSave={(updatedOption: any) => {
                    const copySelectedOptions = [...selectedOptions];
                    const updatedOptionIndex = copySelectedOptions.findIndex(
                      (o: any) => o.id === updatedOption.id,
                    );

                    copySelectedOptions[updatedOptionIndex] = updatedOption;
                    setSelectedOptions(copySelectedOptions);

                    setIsEditingOption('');
                  }}
                  option={editingOption}
                  onCancel={() => setIsEditingOption('')}
                />
              ) : (
                <Option
                  onClick={() => {
                    setIsCreatingOption(false);
                    setIsEditingOption(option);
                  }}
                >
                  <div>
                    <OptionName>{option.name}</OptionName>
                    <p>
                      Choices {option.min} to {option.max} items
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      setAvailableOptions([...availableOptions, option]);
                      setSelectedOptions(
                        selectedOptions.filter((o: any) => o.id !== option.id),
                      );
                    }}
                  >
                    X
                  </p>
                </Option>
              )}
            </OptionListItem>
          );
        })}
      </Options>

      <Actions>
        <Button
          secondary
          width="35%"
          onClick={() => navigate(`/menu-builder/category/${categoryId}`)}
        >
          Cancel
        </Button>
        <Button width="55%" onClick={handleSave}>
          Save
        </Button>
      </Actions>

      {menuItem.id && (
        <ItemActions>
          <ItemAction>
            <div>
              <h4>Delete Item</h4>
              <p>Deleting this item, is an ireverisble action.</p>
            </div>

            <DeleteMenuItemButton
              categoryId={categoryId}
              menuItemId={menuItem.id}
            />
          </ItemAction>
        </ItemActions>
      )}
    </MenuItemWrapper>
  );
};

export default MenuItem;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  margin: 5px 0;
  width: 580px;
  background: ${Colours.white};
  padding: 10px 0;
`;

interface ErrorProps {
  show?: boolean;
}
const MenuItemError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;

interface AvailabilityProps {
  available?: boolean;
}
const Availability = styled.h3`
  cursor: pointer;
  user-select: none;
  background: ${(props: AvailabilityProps) =>
    props.available ? Colours.white : Colours.osloGrey};
  padding: ${(props: AvailabilityProps) =>
    props.available ? '7px 0' : '7px 5px'};
  color: ${(props: AvailabilityProps) =>
    props.available ? Colours.oxfordBlue : Colours.white};
`;

const NameInput = styled.input`
  font-size: 40px;
  width: 100%;
  outline: none;
  padding: 10px 0;
  border: none;
`;

const DescriptionTextArea = styled.textarea`
  font-size: 20px;
  outline: none;
  resize: none;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
  border: none;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  font-size: 22px;
  margin-bottom: 20px;

  &:before {
    content: '£';
  }

  input {
    margin-left: 5px;
    width: 100%;
    font-size: 22px;
    outline: none;
    border: none;
  }
`;

const Options = styled.div``;

const OptionListItem = styled.div`
  margin: 15px 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  color: ${Colours.osloGrey};
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

const OptionName = styled.p`
  color: ${Colours.oxfordBlue};
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
`;

const CreatingOption = styled.div`
  margin-top: 15px;
`;

const CreateOptionButton = styled.div`
  align-self: flex-start;
  font-size: 14px;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 10px 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0 10px;
`;

const ItemActions = styled.div`
  margin-top: 50px;

  h4 {
    margin-bottom: 5px;
  }

  p {
    color: ${Colours.osloGrey};
  }
`;

const ItemAction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  ${Button} {
    width: 140px;
    flex-shrink: 0;
    font-size: 12px;
    margin-left: 10px;
  }
`;
