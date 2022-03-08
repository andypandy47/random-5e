import { Flex, Text } from '@chakra-ui/react';
import { IItem } from 'constants/types';
import * as React from 'react';

interface IMagicItemProps {
  item: IItem;
}

const MagicItem: React.FC<IMagicItemProps> = ({ item }) => {
  return (
    <Flex>
      <Text>{item.name}</Text>
    </Flex>
  );
};

export default MagicItem;
