import { Flex, Text } from '@chakra-ui/react';
import { IDisplayItem } from 'constants/types';
import * as React from 'react';

interface IMagicItemProps {
  displayItem: IDisplayItem;
}

const MagicItem: React.FC<IMagicItemProps> = ({ displayItem }) => {
  const { item, count } = displayItem;

  return (
    <Flex>
      <Text>
        {item.name} x{count}
      </Text>
    </Flex>
  );
};

export default MagicItem;
