import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import Label from '../ui/Label';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';
import {uuid} from '../_utils/uuid';

interface Props {
  option: any;
  saving: boolean;
  errors: Map<string, string>;
  clearErrors: (errors: string[]) => void;
  onSave: (option: {
    id: string;
    name: string;
    min: string;
    max: string;
    items: {name: string; price: string}[];
  }) => void;
  onCancel: () => void;
}

const Option = ({
  option,
  saving,
  errors,
  clearErrors,
  onSave,
  onCancel,
}: Props) => {
  const [name, setName] = useState(option.name || '');
  const [min, setMin] = useState(option.min || '');
  const [max, setMax] = useState(option.max || '');
  const [optionItems, setOptionItems] = useState<
    {id: string; name: string; price: string}[]
  >(option.items || []);

  const handleSave = () => {
    onSave({
      id: option.id,
      name,
      min,
      max,
      items: optionItems.map((item: any) => ({
        name: item.name,
        price: item.price,
      })),
    });
  };

  const cloneArray = (array: any[]) => JSON.parse(JSON.stringify(array));

  const hasOptionBeenEdited =
    name !== option.name ||
    min !== option.min ||
    max !== option.max ||
    JSON.stringify(optionItems) !== JSON.stringify(option.items);

  return (
    <OptionWrapper>
      {!hasOptionBeenEdited && (
        <CancelButton
          src={require('../assets/icons/cancel.svg')}
          onClick={onCancel}
        />
      )}

      <Actions>
        <ConfirmButtons
          show={hasOptionBeenEdited}
          saving={saving}
          onConfirm={handleSave}
          onCancel={onCancel}
        />
      </Actions>

      <OptionError show={errors.has('server-error')}>
        {errors.get('server-error')}
      </OptionError>

      <Label>Option Name</Label>
      <OptionError show={errors.has('name')}>{errors.get('name')}</OptionError>

      <OptionNameInput
        value={name}
        onChange={(e: any) => {
          clearErrors(['name']);
          setName(e.target.value);
        }}
        placeholder="Option Name"
      />

      <Label>How many items can the customer choose?</Label>
      <OptionError show={errors.has('choices')}>
        {errors.get('choices')}
      </OptionError>

      <Choices>
        <MinInput
          id="min"
          value={min}
          onChange={(e: any) => {
            clearErrors(['choices']);
            setMin(e.target.value);
          }}
          placeholder="min"
        />
        to
        <MaxInput
          id="min"
          value={max}
          onChange={(e: any) => {
            clearErrors(['choices']);
            setMax(e.target.value);
          }}
          placeholder="max"
        />
      </Choices>

      <Label>Items</Label>

      <OptionError show={errors.has('items')}>
        {errors.get('items')}
      </OptionError>

      <AddItemButton
        onClick={() => {
          clearErrors(['items']);
          const copyOptionItems = cloneArray(optionItems);
          setOptionItems([
            ...copyOptionItems,
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
              <div>
                <ItemName
                  placeholder="Name"
                  value={optionItems[index].name}
                  onChange={(e: any) => {
                    clearErrors([`option-item-name-${index}`]);
                    const value = e.target.value;
                    const copyOptionItems = cloneArray(optionItems);
                    copyOptionItems[index].name = value;
                    setOptionItems(copyOptionItems);
                  }}
                />
                <OptionError show={errors.has(`option-item-name-${index}`)}>
                  {errors.get(`option-item-name-${index}`)}
                </OptionError>
              </div>

              <div>
                <ItemPrice>
                  <input
                    placeholder="Price"
                    value={optionItems[index].price}
                    onChange={(e: any) => {
                      clearErrors([`option-item-price-${index}`]);
                      const value = e.target.value;
                      const copyOptionItems = cloneArray(optionItems);
                      copyOptionItems[index].price = value;
                      setOptionItems(copyOptionItems);
                    }}
                  />
                </ItemPrice>
                <OptionError show={errors.has(`option-item-price-${index}`)}>
                  {errors.get(`option-item-price-${index}`)}
                </OptionError>
              </div>

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
    </OptionWrapper>
  );
};

export default Option;

const OptionWrapper = styled.div`
  position: relative;
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

interface ErrorProps {
  show?: boolean;
}
const OptionError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;

const CancelButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const OptionNameInput = styled.input`
  font-size: 16px;
  outline: none;
  border: none;
  font-weight: bold;
  margin-bottom: 20px;
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

  &::placeholder {
    font-weight: bold;
  }
`;

const MaxInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  outline: none;
  border: none;

  &::placeholder {
    font-weight: bold;
  }
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
  margin: 5px 0 10px;
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
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  padding: 10px 2px;
`;
