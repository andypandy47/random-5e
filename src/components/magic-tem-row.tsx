import * as React from 'react';
import { Center, Checkbox, Flex, Text } from '@chakra-ui/react';
import { IDisplayItem, RarityColours } from 'constants/types';
import { IColumn } from './results-table';

interface IMagicItemRowProps {
  displayItem: IDisplayItem;
  columns: IColumn[];
}

const cellHeight = '70px';

const MagicItemRow: React.FC<IMagicItemRowProps> = ({ displayItem, columns }) => {
  const { item, count } = displayItem;

  return (
    <Flex minHeight={cellHeight} borderBottom={'1px solid #2D3748'}>
      <Text display={'flex'} alignItems={'center'} p={2} width={columns[0].width}>
        {item.name}
      </Text>
      <Text
        display={'flex'}
        alignItems={'center'}
        p={2}
        textColor={RarityColours[item.rarity]}
        width={columns[1].width}
      >
        {item.rarity}
      </Text>
      <Text display={'flex'} alignItems={'center'} p={2} width={columns[2].width}>
        {item.type}
      </Text>
      <Center p={2} width={columns[3].width}>
        <Checkbox isChecked={item.requiresAttunement} isReadOnly isFocusable={false} isDisabled></Checkbox>
      </Center>
      <Text display={'flex'} alignItems={'center'} p={2} flex={1}>
        {item.source}
      </Text>
      <Text display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={columns[4].width} p={2}>
        x{count}
      </Text>
    </Flex>
  );
};

export default MagicItemRow;
