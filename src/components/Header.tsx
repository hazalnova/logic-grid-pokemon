/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function Header() {
  return (
    <header className="w-full pt-8 pb-4 px-1 sm:px-2 heading">
      <h1 className="title text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#BDD4D0] tracking-tight mb-5">
        Pokémon League Logistics
      </h1>

      <div className="bg-[#1E2230] heading-box rounded-r-lg border-l-4 border-[#6CB298] p-6 sm:p-6 shadow-md shadow-black/50">
        <p className="font-gelasio text-base sm:text-lg text-[#A0AEC0] leading-relaxed mb-2">
          Four legendary trainers have just returned from four different regions. Each trainer brought back a unique Pokémon partner caught in a specific Poké Ball, and each Pokémon is holding a powerful battle item.
        </p>
        <p className="font-gelasio text-base sm:text-lg text-[#A0AEC0] leading-relaxed font-bold">
          Use the clues to match each trainer with their region, Pokémon, Poké Ball, and held item.
        </p>
      </div>
    </header>
  );
}
