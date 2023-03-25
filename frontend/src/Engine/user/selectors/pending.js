// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const pendingSelector = createSelector(selfSelector, (self) => self.pending);

export default pendingSelector;
