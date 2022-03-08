import { RepeatIcon } from '@chakra-ui/icons';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { IItem, Items, Rarities, Sources } from 'constants/types';
import { resolve } from 'path';
import * as React from 'react';
import MagicItem from './magic-tem';

interface IResultsDisplay {
  allItems: IItem[];
  count: number;
  selectedItemTypes: Items[];
  selectedRarities: Rarities[];
  selectedSources: Sources[];
}

const ResultsDisplay: React.FC<IResultsDisplay> = ({
  allItems,
  count,
  selectedItemTypes,
  selectedRarities,
  selectedSources
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayedItems, setDisplayedItems] = React.useState(new Array<IItem>());

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

    const randomItems = filteredItems.sort(() => 0.5 - Math.random()).slice(0, count);

    console.log(randomItems);

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
          <MagicItem key={x.name} item={x} />
        ))}
      </Stack>
    </Flex>
  );
};

export default ResultsDisplay;
