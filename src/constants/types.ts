export const DieValues = ['d4', 'd6', 'd8', 'd10', 'd20'];
export type Dice = typeof DieValues[number];
export enum DieValueAmounts {
  d4 = 4,
  d6 = 6,
  d8 = 8,
  d10 = 10,
  d20 = 20
}

export const ItemValues = ['Armor', 'Potion', 'Ring', 'Rod', 'Scroll', 'Staff', 'Wand', 'Weapon', 'Wondrous Item'];
export type Items = typeof ItemValues[number];

export const RarityValues = ['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'];
export type Rarities = typeof RarityValues[number];

export const SourceValues = [
  "Dungeon Master's Guide (SRD)",
  "Xanathar's Guid to Everything",
  "Tasha's Cauldron of Everything",
  "Fizban's Treasury of Dragons",
  'Adventures'
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
