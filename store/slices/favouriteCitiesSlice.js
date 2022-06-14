import {createSlice} from '@reduxjs/toolkit';

export const favoriteCitiesSlice = createSlice({
  name: 'favouriteCities',
  initialState: {
    value: ['London', 'Paris', 'New York'],
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
    getCitiesFromLocaleStorage: (state, action) => {
      state.value = action.payload;
    },
    updateTemp: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {addCity, removeCity, getCitiesFromLocaleStorage, updateTemp} =
  favoriteCitiesSlice.actions;
export default favoriteCitiesSlice.reducer;
