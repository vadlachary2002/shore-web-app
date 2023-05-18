import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export type PaymentStatus = {
    status?: boolean;
};

export const initialPaymentStatus: PaymentStatus = {
  status: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialPaymentStatus,
  reducers: {
    updatePaymentStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

const { reducer } = paymentSlice;

export const { updatePaymentStatus } = paymentSlice.actions;

export default reducer;
