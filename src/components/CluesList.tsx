/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CLUES, ClueItem } from '../data';

export function CluesList() {
  // Optional soft toggle to let players track clues they have used
  const [checkedClues, setCheckedClues] = useState<Record<number, boolean>>({});

  const toggleClue = (id: number) => {
    setCheckedClues((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="w-full my-2">
      <div className="bg-[#1E2230] rounded-xl p-5 sm:p-6 border border-[#456A64]/40 shadow-md shadow-black/70">
        <h2 className="text-xs uppercase font-bold tracking-widest text-[#6CB298] mb-4">
          The Clues
        </h2>

        <ul className="space-y-3.5 sm:space-y-4">
          {CLUES.map((clue: ClueItem) => {
            const isChecked = !!checkedClues[clue.id];
            return (
              <li
                key={clue.id}
                onClick={() => toggleClue(clue.id)}
                className={`flex items-start gap-3.5 sm:gap-4 p-2 rounded-md transition-colors cursor-pointer select-none ${
                  isChecked ? 'opacity-50' : 'hover:bg-[#12141C]/40'
                }`}
              >
                {/* Bullet point perfectly centered with the first line of text */}
                <div className="flex h-[19.5px] sm:h-[22.75px] items-center shrink-0 mt-[2px]">
                  <i className="fa-kit fa-circle-half-stroke-horizontal-circle-dot text-[#6cb298]" ></i>
                </div>

                <div className="text-xs sm:text-sm leading-relaxed text-[#A0AEC0]">
                  <span className="font-medium text-[#DC8E6F] mr-2 text-xs sm:text-sm tracking-wider uppercase">
                    {clue.label}:
                  </span>
                  <span className={isChecked ? 'line-through decoration-[#456A64]' : ''}>
                    {clue.segments.map((seg, i) =>
                      seg.bold ? (
                        <strong
                          key={i}
                          className="font-bold text-[#F7FAFC] tracking-wide"
                        >
                          {seg.text}
                        </strong>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
