/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Check } from 'lucide-react';
import { CellState, GridState, CategoryName } from '../types';
import { CATEGORIES, CATEGORY_LABELS, SUBGRIDS } from '../data';

interface LogicGridProps {
  gridState: GridState;
  onCellClick: (subgridId: string, rowCat: CategoryName, colCat: CategoryName, rowItem: string, colItem: string) => void;
}

interface ColumnCategoryDef {
  cat: CategoryName;
  label: string;
  items: string[];
}

interface RowCategoryDef {
  cat: CategoryName;
  label: string;
  items: string[];
  colCategories: CategoryName[];
}

export function LogicGrid({ gridState, onCellClick }: LogicGridProps) {
  // Top columns (4 category blocks)
  const topColumns: ColumnCategoryDef[] = [
    { cat: 'Pokemon', label: CATEGORY_LABELS.Pokemon, items: CATEGORIES.Pokemon },
    { cat: 'PokeBalls', label: CATEGORY_LABELS.PokeBalls, items: CATEGORIES.PokeBalls },
    { cat: 'HeldItems', label: CATEGORY_LABELS.HeldItems, items: CATEGORIES.HeldItems },
    { cat: 'Regions', label: CATEGORY_LABELS.Regions, items: CATEGORIES.Regions },
  ];

  // Left rows (4 category blocks with decreasing number of subgrid columns)
  const rowCategories: RowCategoryDef[] = [
    {
      cat: 'Trainers',
      label: CATEGORY_LABELS.Trainers,
      items: CATEGORIES.Trainers,
      colCategories: ['Pokemon', 'PokeBalls', 'HeldItems', 'Regions'],
    },
    {
      cat: 'Regions',
      label: CATEGORY_LABELS.Regions,
      items: CATEGORIES.Regions,
      colCategories: ['Pokemon', 'PokeBalls', 'HeldItems'],
    },
    {
      cat: 'HeldItems',
      label: CATEGORY_LABELS.HeldItems,
      items: CATEGORIES.HeldItems,
      colCategories: ['Pokemon', 'PokeBalls'],
    },
    {
      cat: 'PokeBalls',
      label: CATEGORY_LABELS.PokeBalls,
      items: CATEGORIES.PokeBalls,
      colCategories: ['Pokemon'],
    },
  ];

  // Find subgrid definition
  const getSubgridId = (rowCat: CategoryName, colCat: CategoryName) => {
    const sg = SUBGRIDS.find((s) => s.rowCat === rowCat && s.colCat === colCat);
    return sg ? sg.id : `${rowCat}_${colCat}`;
  };

  return (
    <div className="w-full my-2">
      <div className="overflow-x-auto pb-4 pt-1">
        <div className="inline-block min-w-max align-middle select-none grid-back shadow-md shadow-black/70">
          {/* TOP HEADERS CONTAINER */}
          <div className="flex">
            {/* Top-left empty corner above row labels */}
            <div className="w-44 shrink-0 flex flex-col justify-end p-2 pb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#456A64]">
                LOGIC MATRIX
              </span>
            </div>

            {/* Top column headers */}
            <div className="flex">
              {topColumns.map((colGroup) => (
                <div
                  key={colGroup.cat}
                  className="flex flex-col border-l-2 border-r border-[#456A64]"
                >
                  {/* Category Banner matching left grid category styling */}
                  <div className="h-7 flex items-center justify-center bg-[#1E2230] border-b border-[#456A64]/50 px-2">
                    <span className="text-[11px] font-mono font-semibold tracking-widest text-[#456A64] uppercase whitespace-nowrap">
                      {colGroup.label}
                    </span>
                  </div>

                  {/* Vertical item names */}
                  <div className="h-40 flex items-end bg-[#12141C]/50">
                    {colGroup.items.map((item) => (
                      <div
                        key={item}
                        className="w-9 h-full flex items-end justify-center pb-2.5 border-r border-[#456A64]/30 last:border-r-0"
                      >
                        <span
                          className="text-xs font-medium text-[#A0AEC0] whitespace-nowrap select-none tracking-tight"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GRID ROWS CONTAINER */}
          <div className="flex flex-col border-t-2 border-[#456A64]">
            {rowCategories.map((rowGroup, rowGroupIdx) => (
              <div
                key={rowGroup.cat}
                className="flex border-b-2 border-[#456A64]"
              >
                {/* Left Category Label & Item Labels */}
                <div className="w-44 shrink-0 flex border-r-2 border-[#456A64] bg-[#1E2230]/40">
                  {/* Category Title Column (vertical badge) */}
                  <div className="w-8 shrink-0 flex items-center justify-center bg-[#1E2230] border-r border-[#456A64]/50 py-2">
                    <span className="text-[11px] font-mono font-semibold tracking-widest text-[#456A64] uppercase transform -rotate-90 whitespace-nowrap">
                      {rowGroup.label}
                    </span>
                  </div>

                  {/* Item Names */}
                  <div className="flex-1 flex flex-col justify-around py-0.5">
                    {rowGroup.items.map((item) => (
                      <div
                        key={item}
                        className="h-9 flex items-center justify-end pr-3 border-b border-[#456A64]/20 last:border-b-0"
                      >
                        <span className="text-xs text-[#A0AEC0] font-medium tracking-tight truncate">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subgrid Cells for each Column Category */}
                <div className="flex">
                  {rowGroup.colCategories.map((colCat) => {
                    const subgridId = getSubgridId(rowGroup.cat, colCat);
                    const colItems = CATEGORIES[colCat];

                    return (
                      <div
                        key={colCat}
                        className="flex flex-col border-l-2 border-r border-[#456A64] bg-[#1E2230]"
                      >
                        {rowGroup.items.map((rItem, rIdx) => (
                          <div
                            key={rItem}
                            className="flex border-b border-[#456A64]/50 last:border-b-0"
                          >
                            {colItems.map((cItem, cIdx) => {
                              const cellKey = `${subgridId}:${rItem}:${cItem}`;
                              const cellState: CellState = gridState[cellKey] ?? null;

                              return (
                                <button
                                  key={cItem}
                                  type="button"
                                  id={`cell-${subgridId}-${rIdx}-${cIdx}`}
                                  onClick={() =>
                                    onCellClick(
                                      subgridId,
                                      rowGroup.cat,
                                      colCat,
                                      rItem,
                                      cItem
                                    )
                                  }
                                  title={`${rowGroup.label}: ${rItem} | ${CATEGORY_LABELS[colCat]}: ${cItem}`}
                                  className={`w-9 h-9 flex items-center justify-center border-r border-[#456A64]/50 last:border-r-0 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#6CB298] ${
                                    cellState === 'O'
                                      ? 'bg-[#6CB298] text-[#12141C]'
                                      : cellState === 'X'
                                      ? 'bg-[#1E2230] hover:bg-[#252a3b]'
                                      : 'bg-[#1E2230] hover:bg-[#282d3f]'
                                  }`}
                                >
                                  {cellState === 'X' && (
                                    <X
                                      className="w-4.5 h-4.5 text-[#DC8E6F] stroke-[2.5]"
                                      aria-hidden="true"
                                    />
                                  )}
                                  {cellState === 'O' && (
                                    <Check
                                      className="w-5 h-5 text-[#12141C] stroke-[3]"
                                      aria-hidden="true"
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
