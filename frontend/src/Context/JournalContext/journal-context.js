// Modules
import { createContext, useState } from 'react';

export const JournalContext = createContext(null);

JournalContext.displayName = 'Journal Context';

function JournalContextProvider(props) {
  const { children } = props;
  const state = useState(null);

  return (
    <JournalContext.Provider value={state}>
      {children}
    </JournalContext.Provider>
  );
}

export default JournalContextProvider;
