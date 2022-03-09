import { RepeatIcon } from '@chakra-ui/icons';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { Dice, DiceValueAmounts, IDisplayItem, IItem, Items, Rarities, Sources } from 'constants/types';
import * as React from 'react';
import generateRandomValue from 'utilities/random-value';
import MagicItem from './magic-tem';

interface IResultsDisplay {
  allItems: IItem[];
  diceType: Dice;
  diceAmount: number;
  selectedItemTypes: Items[];
  selectedRarities: Rarities[];
  selectedSources: Sources[];
}

const ResultsDisplay: React.FC<IResultsDisplay> = ({
  allItems,
  diceType,
  diceAmount,
  selectedItemTypes,
  selectedRarities,
  selectedSources
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayedItems, setDisplayedItems] = React.useState(new Array<IDisplayItem>());

  const getRandomItems = async () => {
    setIsLoading(() => true);

    const filteredItems = allItems.filter((x) => {
      if (
        selectedItemTypes.includes(x.type) &&
        selectedRarities.includes(x.rarity) &&
        selectedSources.includes(x.source)
      ) {
        return x;
      }
    });

    if (filteredItems.length < 1) {
      console.error('No items available');
      setIsLoading(() => false);
      return;
    }

    const diceTypeValue = DiceValueAmounts[diceType];
    const maximum = diceAmount * diceTypeValue;

    const randomAmount = generateRandomValue(diceAmount, maximum);

    const randomItems: IDisplayItem[] = [];

    for (let i = 0; i < randomAmount; i++) {
      const randomIndex = generateRandomValue(0, filteredItems.length - 1);

      const newRandomItem = filteredItems[randomIndex];

      const duplicateItemIndex = randomItems.findIndex((x) => x.item?.name === newRandomItem?.name);

      if (duplicateItemIndex !== -1) {
        randomItems[duplicateItemIndex].count++;
        continue;
      }

      randomItems.push({
        item: newRandomItem,
        count: 1
      });
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    setDisplayedItems(randomItems);

    setIsLoading(() => false);
  };

  return (
    <Flex flex={1} width={'full'} justifyContent={'center'} flexDir={'column'}>
      <Flex flexBasis={'50px'} alignItems={'center'}>
        <Button
          colorScheme={'whiteAlpha'}
          variant={'solid'}
          leftIcon={<RepeatIcon />}
          isLoading={isLoading}
          onClick={getRandomItems}
        >
          Get Random Items
        </Button>
      </Flex>

      <Stack display={'flex'} flex={1} py={4}>
        {displayedItems.map((x) => (
          <MagicItem key={x.item.name} displayItem={x} />
        ))}
      </Stack>
    </Flex>
  );
};

export default ResultsDisplay;
