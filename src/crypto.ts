/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GridState } from './types';
import {
  CATEGORIES,
  SUBGRIDS,
  TARGET_HASH_FULL_GRID,
  TARGET_HASH_TRAINERS,
  ENCRYPTED_KEY_1,
  ENCRYPTED_KEY_2,
  ENCRYPTED_MSG,
} from './data';

export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function compileFullGridString(gridState: GridState): string {
  let result = '';
  for (const sg of SUBGRIDS) {
    const rowItems = CATEGORIES[sg.rowCat];
    const colItems = CATEGORIES[sg.colCat];
    for (const rItem of rowItems) {
      for (const cItem of colItems) {
        const key = `${sg.id}:${rItem}:${cItem}`;
        const val = gridState[key] ?? '.';
        result += val;
      }
    }
  }
  return result;
}


export function compileTrainerString(gridState: GridState): string {
  const trainers = CATEGORIES.Trainers;
  const regions = CATEGORIES.Regions;
  const pokemon = CATEGORIES.Pokemon;
  const balls = CATEGORIES.PokeBalls;
  const items = CATEGORIES.HeldItems;

  const parts = trainers.map((trainer) => {
    const matchedRegions = regions.filter(
      (r) => gridState[`Trainers_Regions:${trainer}:${r}`] === 'O'
    );
    const matchedRegion = matchedRegions.length === 1 ? matchedRegions[0] : '';

    const matchedPokemons = pokemon.filter(
      (p) => gridState[`Trainers_Pokemon:${trainer}:${p}`] === 'O'
    );
    const matchedPok = matchedPokemons.length === 1 ? matchedPokemons[0] : '';

    const matchedBalls = balls.filter(
      (b) => gridState[`Trainers_PokeBalls:${trainer}:${b}`] === 'O'
    );
    const matchedBall = matchedBalls.length === 1 ? matchedBalls[0] : '';

    const matchedItems = items.filter(
      (i) => gridState[`Trainers_HeldItems:${trainer}:${i}`] === 'O'
    );
    const matchedItem = matchedItems.length === 1 ? matchedItems[0] : '';

    return `${trainer}:${matchedRegion}|${matchedPok}|${matchedBall}|${matchedItem}`;
  });

  return parts.join(';');
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function xorBytes(data: Uint8Array, key: Uint8Array): Uint8Array {
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] ^ key[i % key.length];
  }
  return out;
}

export async function evaluateGridState(gridState: GridState): Promise<string | null> {
  // Check full grid state
  const fullGridStr = compileFullGridString(gridState);
  const fullGridHash = await sha256(fullGridStr);

  if (fullGridHash === TARGET_HASH_FULL_GRID) {

    const keyHashBytes = hexToUint8Array(fullGridHash);
    const encKeyBytes = base64ToUint8Array(ENCRYPTED_KEY_1);
    const recoveredKey = xorBytes(encKeyBytes, keyHashBytes);
    const encMsgBytes = base64ToUint8Array(ENCRYPTED_MSG);
    const decryptedMsgBytes = xorBytes(encMsgBytes, recoveredKey);
    return new TextDecoder().decode(decryptedMsgBytes);
  }

 
  const trainerStr = compileTrainerString(gridState);
  const trainerHash = await sha256(trainerStr);

  if (trainerHash === TARGET_HASH_TRAINERS) {
    const keyHashBytes = hexToUint8Array(trainerHash);
    const encKeyBytes = base64ToUint8Array(ENCRYPTED_KEY_2);
    const recoveredKey = xorBytes(encKeyBytes, keyHashBytes);
    const encMsgBytes = base64ToUint8Array(ENCRYPTED_MSG);
    const decryptedMsgBytes = xorBytes(encMsgBytes, recoveredKey);
    return new TextDecoder().decode(decryptedMsgBytes);
  }

  return null;
}
