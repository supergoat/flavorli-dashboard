import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import {uuid} from '../_utils/uuid';
import Button from '../ui/Button';

interface Props {
  option: any;
  onSave: (arg: any) => void;
  onCancel: () => void;
}

const Option = ({option, onSave, onCancel}: Props) => {
  const [name, setName] = useState(option.name || '');
  const [min, setMin] = useState(option.min || '');
  const [max, setMax] = useState(option.max || '');
  const [optionItems, setOptionItems] = useState<
    {id: string; name: string; price: string}[]
  >(option.items || []);

  return (
    <OptionWrapper>
      {/* <Label>Option Name</Label> */}

      <Header>
        <OptionNameInput
          id="name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Option Name"
        />
        <CloseButton onClick={onCancel}>X</CloseButton>
      </Header>

      <Choices>
        Choices
        <MinInput
          id="min"
          value={min}
          onChange={(e: any) => setMin(e.target.value)}
          placeholder="min"
        />
        to
        <MaxInput
          id="min"
          value={max}
          onChange={(e: any) => setMax(e.target.value)}
          placeholder="max"
        />
      </Choices>

      <Heading>Items</Heading>

      <AddItemButton
        onClick={() => {
          setOptionItems([
            ...optionItems,
            {
              id: uuid(),
              name: '',
              price: '',
            },
          ]);
        }}
      >
        ADD ITEM +
      </AddItemButton>
      <Items>
        {optionItems.map((optionItem, index) => {
          return (
            <Item key={optionItem.id}>
              <ItemName
                placeholder="Name"
                value={optionItems[index].name}
                onChange={(e: any) => {
                  const value = e.target.value;
                  const itemsCopy = [...optionItems];
                  itemsCopy[index].name = value;
                  setOptionItems(itemsCopy);
                }}
              />
              <ItemPrice
                placeholder="Price"
                value={optionItems[index].price}
                onChange={(e: any) => {
                  const value = e.target.value;
                  const itemsCopy = [...optionItems];
                  itemsCopy[index].price = value;
                  setOptionItems(itemsCopy);
                }}
              />

              <p
                onClick={() => {
                  setOptionItems(
                    optionItems.filter(i => i.id !== optionItem.id),
                  );
                }}
              >
                X
              </p>
            </Item>
          );
        })}
      </Items>

      <SaveButton
        width="100px"
        onClick={() => {
          const id = uuid();

          onSave({
            id,
            name,
            min,
            max,
            items: optionItems,
          });
        }}
      >
        Save
      </SaveButton>
    </OptionWrapper>
  );
};

export default Option;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  width: 580px;
  background: ${Colours.white};
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OptionNameInput = styled.input`
  font-size: 16px;
  padding: 5px 0;
  outline: none;
  border: none;
  font-weight: bold;
`;

const CloseButton = styled.div`
  cursor: pointer;
  color: ${Colours.osloGrey};
`;

const Choices = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
`;

const MinInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  padding: 10px 0;
  outline: none;
  border: none;
`;

const MaxInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  padding: 10px 0;
  outline: none;
  border: none;
`;

const Heading = styled.h4`
  margin-top: 10px;
`;

const Items = styled.div``;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  color: ${Colours.osloGrey};
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin-bottom: 10px;
  background: ${Colours.white};
`;

const ItemName = styled.input`
  font-size: 16px;
  color: ${Colours.oxfordBlue};
  outline: none;
  border: none;
  font-weight: bold;
  width: 50%;
  padding: 5px 0;
`;

const ItemPrice = styled.input`
  font-size: 16px;
  outline: none;
  border: none;
  width: 30%;
  padding: 5px 0;
`;

const AddItemButton = styled.div`
  align-self: flex-start;
  font-size: 14px;
  padding: 5px 0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 5px 0;
`;

const SaveButton = styled(Button)`
  align-self: flex-end;
`;
