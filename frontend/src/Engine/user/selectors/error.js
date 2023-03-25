// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const errorSelector = createSelector(selfSelector, (self) => self.error);

export default errorSelector;
