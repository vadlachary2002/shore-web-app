import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectPaymentStatus:(state:RootState)=>boolean = createSelector(
  (state: RootState) => state.payment.status,
  (status)=>status
);
