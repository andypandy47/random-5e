export const DiceValues = ['d4', 'd6', 'd8', 'd10', 'd20'];
export type Dice = typeof DiceValues[number];
export enum DiceValueAmounts {
  d4 = 4,
  d6 = 6,
  d8 = 8,
  d10 = 10,
  d20 = 20
}

export const ItemValues = ['Armor', 'Potion', 'Ring', 'Rod', 'Scroll', 'Staff', 'Wand', 'Weapon', 'Wondrous Item'];
export type Items = typeof ItemValues[number];

export const RarityValues = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'];
export type Rarities = typeof RarityValues[number];

export const RarityColours = {
  Common: '#b9bec4',
  Uncommon: '#1FC219',
  Rare: '#4990E2',
  'Very Rare': '#9810E0',
  Legendary: '#FEA227',
  Artifact: '#BE8972'
};

export const SourceValues = [
  "Dungeon Master's Guide (SRD)",
  "Xanathar's Guide to Everything",
  "Tasha's Cauldron of Everything",
  "Fizban's Treasury of Dragons",
  'Adventures',
  "Player's Handbook"
];
export type Sources = typeof SourceValues[number];

export interface IItem {
  index: string;
  name: string;
  rarity: string;
  type: string;
  requiresAttunement: boolean;
  source: string;
}

export interface IDisplayItem {
  count: number;
  item: IItem;
}
