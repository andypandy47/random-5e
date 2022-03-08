import { Checkbox, CheckboxGroup, FormControl, FormLabel, Wrap, WrapItem } from '@chakra-ui/react';
import { ItemValues } from 'constants/types';
import * as React from 'react';

interface ITypeSelectProps {
  selectableItems: string[];
  onChange(selectedItems: string[]): void;
  defaultAllSelected?: boolean;
  label: string;
}

const GenericTypeSelect: React.FC<ITypeSelectProps> = ({
  selectableItems = [],
  onChange,
  defaultAllSelected = false,
  label = ''
}) => {
  if (selectableItems.length < 1) {
    return;
  }

  const [checkedValues, setCheckValues] = React.useState(new Array(selectableItems.length).fill(defaultAllSelected));
  const [allChecked, setAllChecked] = React.useState(defaultAllSelected);

  const toggleAll = (newValue: boolean) => {
    setAllChecked(() => newValue);

    if (newValue) {
      setCheckValues(new Array(ItemValues.length).fill(true));
      onChange(selectableItems);

      return;
    }

    setCheckValues(new Array(ItemValues.length).fill(false));
    onChange(new Array<string>());
  };

  const handleSelect = (index: number, newValue: boolean) => {
    const newSelectedValues = [...checkedValues];
    newSelectedValues[index] = newValue;

    setCheckValues(newSelectedValues);

    onChange(getSelectedItems(newSelectedValues));

    if (!newValue) {
      setAllChecked(() => false);
    }
  };

  const getSelectedItems = (checkedValues: boolean[]): string[] => {
    return checkedValues
      .map((x, index) => {
        if (!x) {
          return;
        }

        return selectableItems[index];
      })
      .filter((x) => x !== undefined);
  };

  return (
    <FormControl display={'flex'} flexDir={'row'} alignItems={'center'}>
      <FormLabel mb={'none'} minWidth={'100px'}>
        {label}
      </FormLabel>
      <Wrap>
        <WrapItem>
          <Checkbox defaultChecked isChecked={allChecked} onChange={() => toggleAll(!allChecked)} mr={2}>
            All
          </Checkbox>
        </WrapItem>
        <CheckboxGroup>
          {selectableItems.map((value, index) => (
            <WrapItem key={`${value}-${index}`}>
              <Checkbox isChecked={checkedValues[index]} onChange={(e) => handleSelect(index, e.target.checked)} mr={2}>
                {value}
              </Checkbox>
            </WrapItem>
          ))}
        </CheckboxGroup>
      </Wrap>
    </FormControl>
  );
};

export default GenericTypeSelect;
