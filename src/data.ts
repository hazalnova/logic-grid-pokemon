/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CategoryName, SubgridDef } from './types';

export const CATEGORIES: Record<CategoryName, string[]> = {
  Trainers: ['Ash', 'Blake', 'Jessie', 'Misty'],
  Regions: ['Johto', 'Kanto', 'Sinnoh', 'Unova'],
  Pokemon: ['Bulbasaur', 'Charmander', 'Pikachu', 'Squirtle'],
  PokeBalls: ['Crystal Ball', 'Love Ball', 'Moon Ball', 'Safari Ball'],
  HeldItems: ['Choice Scarf', 'Focus Sash', 'Life Orb', 'Rocky Helmet'],
};

export const CATEGORY_LABELS: Record<CategoryName, string> = {
  Trainers: 'TRAINERS',
  Regions: 'REGIONS',
  Pokemon: 'POKÉMON',
  PokeBalls: 'POKÉ BALLS',
  HeldItems: 'HELD ITEMS',
};

// 10 multi-subgrid matrix mappings:
export const SUBGRIDS: SubgridDef[] = [
  // Row 0: Trainers
  { id: 'Trainers_Pokemon', rowCat: 'Trainers', rowLabel: 'TRAINERS', colCat: 'Pokemon', colLabel: 'POKÉMON' },
  { id: 'Trainers_PokeBalls', rowCat: 'Trainers', rowLabel: 'TRAINERS', colCat: 'PokeBalls', colLabel: 'POKÉ BALLS' },
  { id: 'Trainers_HeldItems', rowCat: 'Trainers', rowLabel: 'TRAINERS', colCat: 'HeldItems', colLabel: 'HELD ITEMS' },
  { id: 'Trainers_Regions', rowCat: 'Trainers', rowLabel: 'TRAINERS', colCat: 'Regions', colLabel: 'REGIONS' },

  // Row 1: Regions
  { id: 'Regions_Pokemon', rowCat: 'Regions', rowLabel: 'REGIONS', colCat: 'Pokemon', colLabel: 'POKÉMON' },
  { id: 'Regions_PokeBalls', rowCat: 'Regions', rowLabel: 'REGIONS', colCat: 'PokeBalls', colLabel: 'POKÉ BALLS' },
  { id: 'Regions_HeldItems', rowCat: 'Regions', rowLabel: 'REGIONS', colCat: 'HeldItems', colLabel: 'HELD ITEMS' },

  // Row 2: Held Items
  { id: 'HeldItems_Pokemon', rowCat: 'HeldItems', rowLabel: 'HELD ITEMS', colCat: 'Pokemon', colLabel: 'POKÉMON' },
  { id: 'HeldItems_PokeBalls', rowCat: 'HeldItems', rowLabel: 'HELD ITEMS', colCat: 'PokeBalls', colLabel: 'POKÉ BALLS' },

  // Row 3: Poké Balls
  { id: 'PokeBalls_Pokemon', rowCat: 'PokeBalls', rowLabel: 'POKÉ BALLS', colCat: 'Pokemon', colLabel: 'POKÉMON' },
];

export interface ClueItem {
  id: number;
  label: string;
  segments: Array<{ text: string; bold?: boolean }>;
}

export const CLUES: ClueItem[] = [
  {
    id: 1,
    label: 'Clue 1',
    segments: [
      { text: 'The trainer from ' },
      { text: 'Sinnoh', bold: true },
      { text: ', the trainer from ' },
      { text: 'Kanto', bold: true },
      { text: ', the ' },
      { text: 'Safari Ball', bold: true },
      { text: ' user, and the trainer with the ' },
      { text: 'Choice Scarf', bold: true },
      { text: ' are four completely different people.' },
    ],
  },
  {
    id: 2,
    label: 'Clue 2',
    segments: [
      { text: 'Blake', bold: true },
      { text: "'s partner is " },
      { text: 'Bulbasaur', bold: true },
      { text: ', but Blake is not the trainer from ' },
      { text: 'Sinnoh', bold: true },
      { text: '.' },
    ],
  },
  {
    id: 3,
    label: 'Clue 3',
    segments: [
      { text: 'The trainer from ' },
      { text: 'Johto', bold: true },
      { text: ' caught their ' },
      { text: 'Charmander', bold: true },
      { text: ' in a ' },
      { text: 'Moon Ball', bold: true },
      { text: '.' },
    ],
  },
  {
    id: 4,
    label: 'Clue 4',
    segments: [
      { text: 'Misty', bold: true },
      { text: "'s partner is holding the " },
      { text: 'Rocky Helmet', bold: true },
      { text: ', but it was not caught in a ' },
      { text: 'Safari Ball', bold: true },
      { text: ' or a ' },
      { text: 'Crystal Ball', bold: true },
      { text: '.' },
    ],
  },
  {
    id: 5,
    label: 'Clue 5',
    segments: [
      { text: 'The trainer whose Pokémon holds a ' },
      { text: 'Focus Sash', bold: true },
      { text: ' is from ' },
      { text: 'Sinnoh', bold: true },
      { text: '.' },
    ],
  },
  {
    id: 6,
    label: 'Clue 6',
    segments: [
      { text: 'The trainer who used a ' },
      { text: 'Love Ball', bold: true },
      { text: ' did not travel to ' },
      { text: 'Sinnoh', bold: true },
      { text: '.' },
    ],
  },
  {
    id: 7,
    label: 'Clue 7',
    segments: [
      { text: 'Jessie', bold: true },
      { text: ' is not from ' },
      { text: 'Kanto', bold: true },
      { text: ' or ' },
      { text: 'Johto', bold: true },
      { text: ', and her Pokémon does not hold a ' },
      { text: 'Life Orb', bold: true },
      { text: '.' },
    ],
  },
  {
    id: 8,
    label: 'Clue 8',
    segments: [
      { text: 'Whoever caught their partner in the ' },
      { text: 'Crystal Ball', bold: true },
      { text: ' did not bring home a ' },
      { text: 'Pikachu', bold: true },
      { text: '.' },
    ],
  },
];

export const TARGET_HASH_FULL_GRID = '31e7b6662f4d946533c703236cb4fbadce2e3664a5c8c83e6ac2b6119cc4dace';
export const TARGET_HASH_TRAINERS = 'd1660ae4a78e0b43d1307fbca9457c821d8f3fb844756208846d479e8e766093';

export const ENCRYPTED_KEY_1 = '0Zf3IVwDKAbgCyKxH02hFnqc26EJHtlaBjxx2q+zDUU=';
export const ENCRYPTED_KEY_2 = 'MRZLo9TAtyAC/F4u2rwmOak90n3oo3Ns6JOAVb0Btxg=';

export const ENCRYPTED_MSG = 'pwIoI1MN0w6joETmFth6/szRiKnAs38QTJqir0YUo+KPHm1nJzzdCr2pU7xToDXOxpKGoNWhfhYI3q64E1CV+YEdIysWKdQCoLgG';
