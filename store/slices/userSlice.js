import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', password: '' },
  reducers: {
    addUser: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
