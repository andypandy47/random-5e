import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text
} from '@chakra-ui/react';
import { Dice } from 'constants/types';
import * as React from 'react';

interface IAmountSelectProps {
  onDiceAmountChange(diceAmount: number): void;
  onDiceTypeChange(diceType: Dice): void;
  diceType: Dice;
  diceAmount: number;
}

const AmountSelect: React.FC<IAmountSelectProps> = ({ onDiceAmountChange, onDiceTypeChange, diceType, diceAmount }) => {
  return (
    <FormControl display={'flex'} flexDir={'row'} alignItems={'center'}>
      <FormLabel mb={'none'} minWidth={'100px'}>
        Amount:
      </FormLabel>
      <NumberInput
        width={'75px'}
        value={diceAmount}
        onChange={(valueAsString, valueAsNumber) => onDiceAmountChange(valueAsNumber)}
        mr={2}
        size={'sm'}
        min={1}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text mr={2}>x</Text>
      <Select
        value={diceType}
        onChange={(e) => onDiceTypeChange(e.target.value as Dice)}
        name="die-type-dropdown"
        width={'100px'}
        size={'sm'}
      >
        <option value={'d4'} style={{ color: 'black' }}>
          d4
        </option>
        <option value={'d6'} style={{ color: 'black' }}>
          d6
        </option>
        <option value={'d8'} style={{ color: 'black' }}>
          d8
        </option>
        <option value={'d10'} style={{ color: 'black' }}>
          d10
        </option>
        <option value={'d20'} style={{ color: 'black' }}>
          d20
        </option>
      </Select>
    </FormControl>
  );
};

export default AmountSelect;
