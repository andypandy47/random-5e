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
import { Dice, DieValueAmounts } from 'constants/types';
import * as React from 'react';

interface IAmountSelectProps {
  onChange(newAmount: number): void;
}

const AmountSelect: React.FC<IAmountSelectProps> = ({ onChange }) => {
  const [dieType, setDieType] = React.useState<Dice>('d4');
  const [dieAmount, setDieAmount] = React.useState(1);

  const handleChange = (type: Dice, amount: number) => {
    setDieAmount(amount);
    setDieType(type);

    const dieTypeAmount = DieValueAmounts[type];
    const maximum = amount * dieTypeAmount;

    const randomValue = Math.floor(Math.random() * (maximum - amount + 1)) + amount;

    onChange(randomValue);
  };

  return (
    <FormControl display={'flex'} flexDir={'row'} alignItems={'center'}>
      <FormLabel mb={'none'} minWidth={'100px'}>
        Amount:
      </FormLabel>
      <NumberInput
        width={'75px'}
        value={dieAmount}
        onChange={(valueAsString, valueAsNumber) => handleChange(dieType, valueAsNumber)}
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
        value={dieType}
        onChange={(event) => handleChange(event.target.value as Dice, dieAmount)}
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
