import * as React from 'react';
import { RepeatIcon } from '@chakra-ui/icons';
import { Button, Flex, ResponsiveValue, Text } from '@chakra-ui/react';
import { Dice, DiceValueAmounts, IDisplayItem, IItem, Items, Rarities, Sources } from 'constants/types';
import generateRandomValue from 'utilities/random-value';
import MagicItemRow from './magic-tem-row';

interface IResultsDisplay {
  allItems: IItem[];
  diceType: Dice;
  diceAmount: number;
  selectedItemTypes: Items[];
  selectedRarities: Rarities[];
  selectedSources: Sources[];
}

export interface IColumn {
  title: string;
  width?: string[];
  flex?: number;
  alignment?: string[];
}

const tableHeight = ['200px', '300px', '300px', '350px', '350px', '700px'];
const columns: IColumn[] = [
  {
    title: 'Name',
    width: ['200px', '200px', '200px', '150px', '300px', '370px']
  },
  {
    title: 'Rarity',
    width: ['160px', '160px', '160px', '100px', '120px', '160px']
  },
  {
    title: 'Type',
    width: ['160px', '160px', '160px', '70px', '100px', '160px']
  },
  {
    title: 'Attunement?',
    width: ['200px', '200px', '200px', '100px', '140px', '200px'],
    alignment: ['center']
  },
  {
    title: 'Source',
    flex: 1
  },
  {
    title: 'Count',
    width: ['80px'],
    alignment: ['right']
  }
];

const ResultsTable: React.FC<IResultsDisplay> = ({
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
      setDisplayedItems([]);
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
    <Flex flex={1} width={'full'} justifyContent={'flex-start'} flexDir={'column'}>
      <Flex flexBasis={'100px'} alignItems={'center'}>
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

      <Flex id="results-display" flexDir={'column'} flex={1}>
        <Flex flexBasis={'40px'} width={'full'} borderBottom={'1px solid #718096'}>
          {columns.map((column) => (
            <Text
              key={column.title}
              textTransform={'uppercase'}
              fontWeight={'bold'}
              p={2}
              width={column.width ?? ''}
              flex={column.flex ?? ''}
              textAlign={column.alignment as ResponsiveValue<CanvasTextAlign>}
            >
              {column.title}
            </Text>
          ))}
        </Flex>
        <Flex overflowY={'auto'} maxHeight={tableHeight} flex={1} flexDir={'column'}>
          {displayedItems.length > 0 ? (
            displayedItems.map((x) => <MagicItemRow key={x.item.name} displayItem={x} columns={columns} />)
          ) : (
            <Text p={2}>No items</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResultsTable;
