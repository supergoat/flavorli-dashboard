import React, {useState} from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Colours from '../Colours';
import SelectOption from '../components/SelectOption';
import SelectDietaryItems from './SelectDietaryItems';

interface Props extends RouteComponentProps {
  menuItem: any;
  options: any;
}
const MenuItem = ({menuItem, options}: Props) => {
  const [name, setName] = useState(menuItem.name);
  const [price, setPrice] = useState(menuItem.price);
  const [description, setDescription] = useState(menuItem.description || '');
  const [dietarySelected, setDietarySelected] = useState(menuItem.dietary);
  const [selectedOptions, setSelectedOptions] = useState(menuItem.options);
  const [availableOptions, setAvailableOptions] = useState(options);

  const [rows, setRows] = useState(1);

  const handleDescriptionChange = (event: any) => {
    const textareaLineHeight = 24;
    const minRows = 1;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setDescription(event.target.value);
    setRows(currentRows);
  };

  return (
    <MenuItemWrapper>
      <NameInput
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />

      <Price>
        <Currency>£</Currency>
        <input
          min="0"
          type="number"
          value={price}
          step="0.01"
          onChange={(e: any) => setPrice(e.target.value)}
        />
      </Price>

      <Info>
        <Image src={menuItem.image} alt={name} />

        <DescriptionTextArea
          rows={rows}
          onChange={handleDescriptionChange}
          value={description}
          placeholder="Description"
        />
      </Info>

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
    </MenuItemWrapper>
  );
};

export default MenuItem;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  margin: 20px 0;
  width: 580px;
  background: ${Colours.white};
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
  flex-shrink: 0;
  background: ${Colours.gallery};
  object-fit: cover;
  margin: 0 10px;
`;

const NameInput = styled.input`
  font-size: 32px;
  outline: none;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 3px;

  &:focus {
    border: 1px solid ${Colours.gallery};
  }
`;

const Price = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 20px;

  input {
    align-self: flex-start;
    font-size: 24px;
    outline: none;
    padding: 10px 10px 10px 30px;
    border: 1px solid transparent;
    border-radius: 3px;
    width: 210px;
    &:focus {
      border: 1px solid ${Colours.gallery};
    }
  }
`;

const Currency = styled.div`
  position: absolute;
  left: 10px;
  top: 11px;
  font-size: 24px;
`;

const DescriptionTextArea = styled.textarea`
  padding: 10px;
  font-size: 20px;
  max-height: 200px;
  outline: none;
  resize: none;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 3px;

  &:focus {
    border: 1px solid ${Colours.gallery};
  }
`;

const Options = styled.div`
  margin-top: 10px;
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
