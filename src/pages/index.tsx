import { Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import AmountSelect from 'components/input/amount-select';
import GenericTypeSelect from 'components/input/checkbox-type-select';
import ResultsDisplay from 'components/results-display';
import { IItem, ItemValues, RarityValues, SourceValues } from 'constants/types';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import readItemsJson from 'utilities/read-item-json';

interface IHomeProps {
  items: IItem[];
}

const Home: NextPage<IHomeProps> = ({ items }) => {
  const [count, setCount] = React.useState(1);
  const [itemTypes, setItemTypes] = React.useState(ItemValues);
  const [rarities, setRarities] = React.useState(RarityValues);
  const [sources, setSources] = React.useState(SourceValues);

  return (
    <>
      <Head>
        <title>Random 5e</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        minH={'full'}
        backgroundColor={'gray.800'}
        textColor={'gray.50'}
        flexDir={'column'}
        alignItems={'center'}
        mx={'auto'}
      >
        <Flex
          as="header"
          width={'full'}
          p={4}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={'gray.900'}
        >
          <Heading fontSize={'5xl'} as={'h1'}>
            Random 5e
          </Heading>
        </Flex>
        <Flex as={'main'} flexDir={'column'} alignItems={'center'} p={4} flex={1} width={'5xl'}>
          <Flex width={'full'} justifyContent={'flex-start'} mb={4}>
            <Heading fontSize={'3xl'} as={'h2'}>
              Magic Items
            </Heading>
          </Flex>
          <Divider mb={4} />
          <Stack width={'full'} p={2} spacing={8}>
            <AmountSelect onChange={setCount} />

            <GenericTypeSelect
              selectableItems={ItemValues}
              label={'Item Type:'}
              onChange={setItemTypes}
              defaultAllSelected
            />

            <GenericTypeSelect
              selectableItems={RarityValues}
              label={'Rarity:'}
              onChange={setRarities}
              defaultAllSelected
            />

            <GenericTypeSelect
              selectableItems={SourceValues}
              label={'Source:'}
              onChange={setSources}
              defaultAllSelected
            />
          </Stack>

          <ResultsDisplay
            allItems={items}
            count={count}
            selectedItemTypes={itemTypes}
            selectedRarities={rarities}
            selectedSources={sources}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const items = readItemsJson();

  return {
    props: {
      items: items
    }
  };
};
