import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    // reducer functions are functions, which take some input, and then transform that input and give a new output, a new result.
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setMovies, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
