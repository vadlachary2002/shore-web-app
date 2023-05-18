import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { SearchStatus } from './reducer';

export const selectSearch:(state:RootState)=>SearchStatus = createSelector(
  (state: RootState) => state.search,
  (state)=>state,
);
