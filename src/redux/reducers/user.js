import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  // a slice of our global state
  name: "user", // an identifier on that piece of state
  initialState: null,
  reducers: {
    // all the reducers this state slice needs
    setUser: (state, action) => action.payload, // reseives the current state and the action by default, by the redux library
    // returns the new state
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
