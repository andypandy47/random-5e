import { IItem } from 'constants/types';
import itemsJson from 'assets/indexed-magic-items.json';
import spellScrollsJson from 'assets/indexed-spell-scrolls.json';

const readItemsJson = (): IItem[] => {
  const items = itemsJson as IItem[];
  const spellScrolls = spellScrollsJson as IItem[];

  return items.concat(spellScrolls);
};

export default readItemsJson;
