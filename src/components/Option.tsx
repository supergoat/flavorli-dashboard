import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import Button from '../ui/Button';
import Label from '../ui/Label';
import {uuid} from '../_utils/uuid';

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

  const handleSave = () => {
    onSave({
      variables: {
        id: option.id,
        name,
        min,
        max,
        items: optionItems.map((item: any) => ({
          name: item.name,
          price: item.price,
        })),
      },
    });
  };

  return (
    <OptionWrapper>
      <Header>
        <Label>Option Name</Label>

        <CloseButton onClick={onCancel}>X</CloseButton>
      </Header>

      <OptionNameInput
        id="name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        placeholder="Option Name"
      />

      <Label>How many items can the customer choose?</Label>

      <Choices>
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

      <Label>Items</Label>

      <AddItemButton
        onClick={() => {
          setOptionItems([
            ...optionItems,
            {
              id: uuid(),
              name: '',
              price: '0',
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
              <ItemPrice>
                <input
                  placeholder="Price"
                  value={optionItems[index].price}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    const itemsCopy = [...optionItems];
                    itemsCopy[index].price = value;
                    setOptionItems(itemsCopy);
                  }}
                />
              </ItemPrice>

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

      <SaveButton width="100px" onClick={handleSave}>
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
  padding: 20px 15px 15px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OptionNameInput = styled.input`
  font-size: 16px;
  outline: none;
  border: none;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
`;

const MinInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  outline: none;
  border: none;
`;

const MaxInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  outline: none;
  border: none;
`;

const Items = styled.div``;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
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

const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  width: 30%;

  &:before {
    content: '£';
  }

  input {
    font-size: 16px;
    outline: none;
    border: none;
    margin-left: 5px;
    padding: 5px 0;
  }
`;

const AddItemButton = styled.div`
  align-self: flex-start;
  font-size: 12px;
  padding: 5px 0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 5px 0;
`;

const SaveButton = styled(Button)`
  align-self: flex-end;
`;
