import { IItem } from 'constants/types';
import itemsJson from 'assets/indexed-magic-items.json';

const readItemsJson = (): IItem[] => {
  return itemsJson;
};

export default readItemsJson;
