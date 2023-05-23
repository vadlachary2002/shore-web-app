import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { SearchData } from '../../components/DataModels/SearchData';

export type SearchStatus = {
  status?: SearchData,
}
const initialStatus:SearchData = {
  jobTitle: '',
  location: '',
  company:'',
  salary: 100,
  discipline: [],
  region: [],
  sector: [],
  title: [],
};
const retriviewStatus = localStorage.getItem('search')?JSON.parse(localStorage.getItem('search')):initialStatus;
export const initialSearch: SearchStatus = {
  status:retriviewStatus,
};
const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearch,
  reducers: {
    updateSearch: (state, action: PayloadAction<SearchStatus>) => {
      state.status = action.payload.status; 
      localStorage.setItem('search',JSON.stringify(action.payload.status));
    },
  },
});

const { reducer } = searchSlice;

export const { updateSearch } = searchSlice.actions;

export default reducer;
