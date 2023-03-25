// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const accessTokenSelector = createSelector(selfSelector, (self) => self.accessToken);

export default accessTokenSelector;
