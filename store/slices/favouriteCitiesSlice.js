import {createSlice} from '@reduxjs/toolkit';

export const favoriteCitiesSlice = createSlice({
  name: 'favouriteCities',
  initialState: {
    value: ['Paris', 'Florence', 'New York'],
  },
  reducers: {
    addCity: (state, action) => {
      if (!state.value.includes(action.payload)) {
        state.value.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.value = state.value.filter(city => city !== action.payload);
    },
  },
});

export const {addCity, removeCity} = favoriteCitiesSlice.actions;
export default favoriteCitiesSlice.reducer;
