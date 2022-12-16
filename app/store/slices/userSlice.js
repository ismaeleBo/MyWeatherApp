import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    isLogged: false,
    biometryActive: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.isLogged = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    toggleBiometry: (state) => {
      state.biometryActive = !state.biometryActive;
    },
  },
});

export const { addUser, toggleBiometry } = userSlice.actions;
export default userSlice.reducer;
