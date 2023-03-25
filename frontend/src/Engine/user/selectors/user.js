// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const userSelector = createSelector(selfSelector, (self) => self.user);

export default userSelector;
