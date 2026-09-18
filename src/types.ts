/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CellState = null | 'X' | 'O';

export type CategoryName = 'Trainers' | 'Regions' | 'Pokemon' | 'PokeBalls' | 'HeldItems';

export interface SubgridDef {
  id: string;
  rowCat: CategoryName;
  rowLabel: string;
  colCat: CategoryName;
  colLabel: string;
}

export type GridState = Record<string, CellState>;

export interface SubmissionFeedback {
  status: 'idle' | 'success' | 'error';
  message: string;
}
