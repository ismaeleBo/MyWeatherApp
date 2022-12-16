import { createSlice } from '@reduxjs/toolkit';

export const favoriteCitiesSlice = createSlice({
  name: 'favouriteCities',
  initialState: { list: ['Paris', 'Florence', 'New York'] },
  reducers: {
    addCity: (state, action) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.list = state.list.filter((city) => city !== action.payload);
    },
  },
});

export const { addCity, removeCity } = favoriteCitiesSlice.actions;
export default favoriteCitiesSlice.reducer;
