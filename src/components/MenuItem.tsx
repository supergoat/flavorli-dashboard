import React, {useState} from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Colours from '../Colours';
import SelectOption from '../components/SelectOption';
import SelectDietaryItems from './SelectDietaryItems';

interface Props extends RouteComponentProps {
  menuItem: any;
}
const MenuItem = ({menuItem}: Props) => {
  const [name, setName] = useState(menuItem.name);
  const [description, setDescription] = useState(menuItem.description || '');
  const [dietarySelected, setDietarySelected] = useState(menuItem.dietary);
  const [selectedOptions, setSelectedOptions] = useState(menuItem.options);

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
      <Image src={menuItem.image} alt={name} />

      <NameInput
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <DescriptionTextArea
        rows={rows}
        onChange={handleDescriptionChange}
        value={description}
        placeholder="Description"
      />
      <Price>£{menuItem.price.toFixed(2)}</Price>
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
        onAdd={(option: any) => {
          setSelectedOptions([...selectedOptions, option]);
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
                onClick={() =>
                  setSelectedOptions(
                    selectedOptions.filter((o: any) => o.id !== option.id),
                  )
                }
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
  padding: 20px 35px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 20px 0;
  width: 580px;
  background: ${Colours.white};
`;

const Image = styled.img`
  height: 250px;
  width: 100%;
  flex-shrink: 0;
  background: ${Colours.gallery};
  margin-right: 15px;
  object-fit: cover;
`;

const NameInput = styled.input`
  font-size: 40px;
  margin-top: 10px;
  padding: 10px 0;
  border: none;
  outline: none;
`;

const Price = styled.h3`
  font-size: 25px;
  padding: 5px 0;
  margin-bottom: 20px;
`;

const DescriptionTextArea = styled.textarea`
  padding: 10px 2px;
  line-height: 24px;
  font-size: 20px;
  border: none;
  outline: none;
  resize: none;
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
