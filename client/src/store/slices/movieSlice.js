import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  pageInfo: {
    pageIndex: 0,
    pageSize: 0,
    total: 0,
  },
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.itemList;
      state.pageInfo = action.payload.pageInfo;
    },
  },
});

export const {setMovies} = movieSlice.actions;

export default movieSlice.reducer;
