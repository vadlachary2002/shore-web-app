import { combineReducers } from 'redux';
import Map from './Map/reducer';
import payment from './Payments/reducer';
import search from './SearchContent/reducer';

export default combineReducers({
  Map,payment,search,
});
