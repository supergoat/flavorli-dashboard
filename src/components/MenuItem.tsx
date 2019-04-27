import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps, navigate} from '@reach/router';
import Colours from '../Colours';
import SelectOption from '../components/SelectOption';
import Button from '../ui/Button';
import SelectDietaryItems from './SelectDietaryItems';
import DeleteMenuItemButton from '../containers/DeleteMenuItemButton';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';
import CreateOption from '../containers/CreateOption';
import EditingOption from '../containers/EditingOption';

interface Props extends RouteComponentProps {
  categoryId?: string;
  menuItem: any;
  options: any;
  onSave: (arg: any) => void;
}
const MenuItem = ({categoryId, menuItem, options, onSave}: Props) => {
  const textAreaEl: any = useRef();
  useEffect(() => calculateTextAreaRows(textAreaEl));

  const [name, setName] = useState(menuItem.name);
  const [price, setPrice] = useState(menuItem.price);
  const [description, setDescription] = useState(menuItem.description || '');
  const [dietarySelected, setDietarySelected] = useState(menuItem.dietary);
  const [selectedOptions, setSelectedOptions] = useState(menuItem.options);
  const [availableOptions, setAvailableOptions] = useState(options);
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [editingOption, setIsEditingOption] = useState<any>(null);

  const handleDescriptionChange = (event: any) => {
    calculateTextAreaRows(textAreaEl);
    setDescription(event.target.value);
  };

  const handleSave = () => {
    onSave({
      variables: {
        id: menuItem.id,
        categoryId,
        name,
        price: Number(price),
        description,
        dietary: dietarySelected,
        options: selectedOptions.map((o: any) => o.id),
      },
    });
  };

  return (
    <MenuItemWrapper>
      <NameInput
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />

      <DescriptionTextArea
        ref={textAreaEl}
        id="description"
        onChange={handleDescriptionChange}
        value={description}
        placeholder="Description"
      />

      <Heading htmlFor="price">Price</Heading>

      <Price>
        <input
          id="price"
          min="0"
          type="number"
          value={price}
          step="0.01"
          onChange={(e: any) => setPrice(e.target.value)}
        />
      </Price>

      <Heading>Allergens</Heading>

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

      <Heading>Options</Heading>
      <SelectOption
        availableOptions={availableOptions}
        onAdd={(option: any) => {
          setSelectedOptions([...selectedOptions, option]);
          setAvailableOptions(
            availableOptions.filter((o: any) => o.id !== option.id),
          );
        }}
      />

      <AddOptionButton onClick={() => setIsAddingOption(true)}>
        ADD OPTION +
      </AddOptionButton>

      {isAddingOption && (
        <CreateOption
          onCreate={(newOption: any) => {
            setSelectedOptions([...selectedOptions, newOption]);
            setIsAddingOption(false);
          }}
          onCancel={() => setIsAddingOption(false)}
        />
      )}

      <Options>
        {selectedOptions.map((option: any) => {
          if (editingOption && editingOption.id === option.id)
            return (
              <EditingOption
                key={option.id}
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
            );
          return (
            <Option key={option.id} onClick={() => setIsEditingOption(option)}>
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

      <ItemActions>
        <ItemAction>
          <div>
            <h4>Hide Item</h4>
            <p>Customers will not be able to view this item</p>
          </div>

          <Button secondary>HIDE ITEM</Button>
        </ItemAction>

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

const Heading = styled.label`
  margin-bottom: 10px;
  color: ${Colours.osloGrey};
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
  margin: 15px 0;
`;

const OptionName = styled.p`
  color: ${Colours.oxfordBlue};
  font-weight: bold;
`;

const AddOptionButton = styled.div`
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
  padding: 20px 0;
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${Button} {
    width: 140px;
    flex-shrink: 0;
    font-size: 12px;
    margin-left: 10px;
  }
`;
