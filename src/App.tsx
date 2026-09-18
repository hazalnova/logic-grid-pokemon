/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GridState, SubmissionFeedback, CategoryName } from './types';
import { evaluateGridState } from './crypto';
import { Header } from './components/Header';
import { LogicGrid } from './components/LogicGrid';
import { CluesList } from './components/CluesList';

export default function App() {
  const [gridState, setGridState] = useState<GridState>({});
  const [history, setHistory] = useState<GridState[]>([]);
  const [feedback, setFeedback] = useState<SubmissionFeedback>({
    status: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCellClick = (
    subgridId: string,
    _rowCat: CategoryName,
    _colCat: CategoryName,
    rowItem: string,
    colItem: string
  ) => {
    const cellKey = `${subgridId}:${rowItem}:${colItem}`;
    const currentVal = gridState[cellKey] ?? null;

    // Record previous state in history array for undo tracking
    setHistory((prevHistory) => [...prevHistory, gridState]);

    setGridState((prev) => {
      const next = { ...prev };

      if (currentVal === null) {
        // 1. Empty -> Eliminated / 'X'
        next[cellKey] = 'X';
      } else if (currentVal === 'X') {
        // 2. Eliminated -> Confirmed / 'O'
        next[cellKey] = 'O';
      } else {
        // 3. Confirmed -> Empty / null
        next[cellKey] = null;
      }

      return next;
    });

    // Reset feedback state on subsequent player interactions
    if (feedback.status !== 'idle') {
      setFeedback({ status: 'idle', message: '' });
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory((prevHistory) => prevHistory.slice(0, -1));
    setGridState(previousState);

    if (feedback.status !== 'idle') {
      setFeedback({ status: 'idle', message: '' });
    }
  };

  const handleReset = () => {
    if (Object.keys(gridState).some((k) => gridState[k] !== null)) {
      setHistory((prevHistory) => [...prevHistory, gridState]);
    }
    setGridState({});
    setFeedback({
      status: 'idle',
      message: '',
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const victoryMessage = await evaluateGridState(gridState);

      if (victoryMessage) {
        setFeedback({
          status: 'success',
          message: victoryMessage,
        });
      } else {
        setFeedback({
          status: 'error',
          message: 'Not quite correct. Double-check your logic and try again!',
        });
      }
    } catch {
      setFeedback({
        status: 'error',
        message: 'Not quite correct. Double-check your logic and try again!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-[#A0AEC0] flex flex-col justify-between selection:bg-[#6CB298] selection:text-[#12141C]">
      <main className="flex-1 pb-16">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          {/* 1. Header & Setup */}
          <Header />

          {/* 2. Side-by-Side Desktop Workspace: Grid + Clues */}
          <div className="flex flex-row gap-8 items-start justify-center mt-4">
            {/* Left Area: Interactive Matrix & Actions */}
            <div className="flex flex-col items-center shrink-0">
              <LogicGrid gridState={gridState} onCellClick={handleCellClick} />

              {/* Action Buttons: Submit, Undo, Reset */}
              <div className="w-full mt-6 mb-4 flex flex-col items-center">
                <div className="flex flex-row items-center justify-center gap-4 w-full max-w-xl">
                  <button
                    id="submit-grid-button"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-8 bg-[#6CB298] hover:bg-[#7bc4aa] active:scale-[0.99] text-[#12141C] font-mono font-bold tracking-widest text-sm uppercase rounded-lg shadow-lg shadow-[#6CB298]/15 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'VERIFYING...' : 'SUBMIT GRID'}
                  </button>

                  <button
                    id="undo-button"
                    type="button"
                    onClick={handleUndo}
                    disabled={isSubmitting || history.length === 0}
                    className="py-3.5 px-6 bg-[#1E2230] hover:bg-[#282d3f] active:scale-[0.99] text-[#A0AEC0] hover:text-[#F7FAFC] border border-[#456A64] hover:border-[#6CB298]/60 font-mono font-bold tracking-widest text-sm uppercase rounded-lg shadow-md transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#456A64]"
                  >
                    UNDO
                  </button>

                  <button
                    id="reset-grid-button"
                    type="button"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    className="py-3.5 px-6 bg-[#1E2230] hover:bg-[#282d3f] active:scale-[0.99] text-[#A0AEC0] hover:text-[#F7FAFC] border border-[#456A64] hover:border-[#6CB298]/60 font-mono font-bold tracking-widest text-sm uppercase rounded-lg shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    RESET GRID
                  </button>
                </div>

                {/* Feedback Area */}
                <AnimatePresence mode="wait">
                  {feedback.status === 'error' && (
                    <motion.div
                      key="error-feedback"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="mt-6 p-4 rounded-lg border border-[#DC8E6F]/30 bg-[#1E2230] text-center max-w-lg w-full shadow-lg shadow-black/20"
                    >
                      <p className="text-[#DC8E6F] font-medium text-sm leading-relaxed tracking-wide">
                        {feedback.message}
                      </p>
                    </motion.div>
                  )}

                  {feedback.status === 'success' && (
                    <motion.div
                      key="success-feedback"
                      initial={{ opacity: 0, scale: 0.96, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="mt-6 p-6 rounded-xl border border-[#6CB298]/40 bg-[#1E2230] text-center max-w-xl w-full shadow-2xl shadow-[#6CB298]/10"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#6CB298]/15 text-[#6CB298] flex items-center justify-center mx-auto mb-3 border border-[#6CB298]/30">
                        <span className="text-xl">★</span>
                      </div>
                      <p className="text-[#6CB298] font-serif font-bold text-lg leading-relaxed tracking-wide">
                        {feedback.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: The Clues Stack (Sticky on desktop) */}
            <div className="w-[440px] shrink-0 sticky top-6">
              <CluesList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
