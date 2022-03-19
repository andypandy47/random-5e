import * as React from 'react';
import { Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import AmountSelect from 'components/input/amount-select';
import GenericTypeSelect from 'components/input/checkbox-type-select';
import ResultsTable from 'components/results-table';
import { Dice, IItem, ItemValues, RarityValues, SourceValues } from 'constants/types';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import readItemsJson from 'utilities/read-item-json';

interface IHomeProps {
  items: IItem[];
}

const defaultDiceAmount = 1;
const defaultDiceType: Dice = 'd4';

const Home: NextPage<IHomeProps> = ({ items }) => {
  const [diceAmount, setDiceAmount] = React.useState(defaultDiceAmount);
  const [diceType, setDiceType] = React.useState(defaultDiceType);
  const [itemTypes, setItemTypes] = React.useState(ItemValues);
  const [rarities, setRarities] = React.useState(RarityValues);
  const [sources, setSources] = React.useState(SourceValues);

  return (
    <>
      <Head>
        <title>Random 5e</title>
        <link rel="shortcut-icon" href="/images/tetrahedron_128.png" />
        <link rel="apple-touch-icon" sizes="128x128" href="/images/tetrahedron_128.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/images/tetrahedron_128.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="A random item picker for DND 5e where results can be filtered type, rarity and source."
        />
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
        <Flex
          as={'main'}
          flexDir={'column'}
          alignItems={'center'}
          p={4}
          flex={1}
          width={['95%', '92%', '90%', '88%', '85%', '60%']}
        >
          <Flex width={'full'} justifyContent={'flex-start'} mb={4}>
            <Heading fontSize={'3xl'} as={'h2'}>
              Magic Items
            </Heading>
          </Flex>
          <Divider mb={4} />
          <Stack width={'full'} p={2} spacing={8}>
            <AmountSelect
              onDiceAmountChange={setDiceAmount}
              onDiceTypeChange={setDiceType}
              diceAmount={diceAmount}
              diceType={diceType}
            />

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

          <ResultsTable
            allItems={items}
            diceType={diceType}
            diceAmount={diceAmount}
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
