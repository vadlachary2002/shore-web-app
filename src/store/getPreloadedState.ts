import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import { initialPaymentStatus, PaymentStatus } from '../store/Payments/reducer';
import { initialSearch, SearchStatus } from '../store/SearchContent/reducer';

const getPreloadedMapState = (): MapState => {
  return {
    ...initialMapState,
  };
};

const getPreloadedPaymentStatus = (): PaymentStatus => {
  return {
    ...initialPaymentStatus,
  };
};

const getPreloadedSearchStatus = (): SearchStatus => {
  return {
    ...initialSearch,
  };
};
const getPreloadedState = (): PartialRootState => {
  return {
    Map: getPreloadedMapState(),
    payment: getPreloadedPaymentStatus(),
    search: getPreloadedSearchStatus(),
  };
};

export default getPreloadedState;
