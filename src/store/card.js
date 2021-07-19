import { createSlice } from '@reduxjs/toolkit';
export const card = createSlice({
  name: 'card',
  initialState: {
    list: [],
    sumBook: 0,
    listNamber: 0,
    url: '',
  },
  reducers: {
    setSumBook(state, data) {
      state.sumBook = data.payload;
    },
    setlistNamber(state, data) {
      state.listNamber = data.payload;
    },
    setList(state, data) {
      state.list = data.payload;
    },
    setUrl(state, data) {
      state.url = data.payload;
    },
  },
});

export const { setList, setSumBook, setUrl, setlistNamber } = card.actions;
export const selectList = state => state.card.list;
export const selectsumBook = state => state.card.sumBook;
export const selecturl = state => state.card.url;
export const selectlistNamber = state => state.card.listNamber;
export default card.reducer;
