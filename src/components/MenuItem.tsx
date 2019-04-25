import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Colours from '../Colours';
import SelectOption from '../components/SelectOption';
import Button from '../ui/Button';
import SelectDietaryItems from './SelectDietaryItems';

interface Props extends RouteComponentProps {
  categoryId?: string;
  menuItem: any;
  options: any;
  onSave: (arg: any) => void;
}
const MenuItem = ({categoryId, menuItem, options, onSave}: Props) => {
  const textAreaEl: any = useRef();

  const [name, setName] = useState(menuItem.name);
  const [price, setPrice] = useState(menuItem.price);
  const [description, setDescription] = useState(menuItem.description || '');
  const [dietarySelected, setDietarySelected] = useState(menuItem.dietary);
  const [selectedOptions, setSelectedOptions] = useState(menuItem.options);
  const [availableOptions, setAvailableOptions] = useState(options);

  const [rows, setRows] = useState(1);

  const calculateTextAreaRows = () => {
    const textareaLineHeight = 24;
    const minRows = 1;

    const previousRows = textAreaEl.current.rows;
    textAreaEl.current.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(
      textAreaEl.current.scrollHeight / textareaLineHeight
    );

    if (currentRows === previousRows) {
      textAreaEl.current.rows = currentRows;
    }
    setRows(currentRows);
  };

  const handleDescriptionChange = (event: any) => {
    calculateTextAreaRows();
    setDescription(event.target.value);
  };

  useEffect(() => calculateTextAreaRows());

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
      {/* <Image src={menuItem.image} alt={name} /> */}

      <Heading htmlFor="name">Name</Heading>
      <NameInput
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Heading htmlFor="description">Description</Heading>
      <DescriptionTextArea
        ref={textAreaEl}
        id="description"
        rows={rows}
        onChange={handleDescriptionChange}
        value={description}
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
      <Options>
        {selectedOptions.map((option: any) => {
          return (
            <Option key={option.id}>
              <div>
                <OptionName>{option.name}</OptionName>
                <p>
                  Choose {option.min} to {option.max} items
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
        <Button secondary width="35%">
          Cancel
        </Button>
        <Button width="55%" onClick={handleSave}>
          Save
        </Button>
      </Actions>
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
  padding: 30px 20px 20px;
  box-shadow: 0 0 2px rgb(0, 0, 0, 0.3);
`;

const Heading = styled.label`
  margin-bottom: 10px;
  color: ${Colours.osloGrey};
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
  flex-shrink: 0;
  background: ${Colours.gallery};
  object-fit: cover;
`;

const NameInput = styled.input`
  font-size: 25px;
  width: 100%;
  outline: none;
  margin-bottom: 20px;
  border: none;
`;

const DescriptionTextArea = styled.textarea`
  font-size: 20px;
  outline: none;
  resize: none;
  width: 100%;
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

const Options = styled.div`
  margin: 10px 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
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

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
