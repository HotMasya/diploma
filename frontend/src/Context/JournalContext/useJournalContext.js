// Modules
import { useContext } from 'react';

// Context
import { JournalContext } from './journal-context';

/**
 * Returns current journal context value and mutator
 *
 * @returns {[import('Models/Journal').default, function]} Current journal context value and mutator
 */
export function useJournalContext() {
  return useContext(JournalContext);
}
