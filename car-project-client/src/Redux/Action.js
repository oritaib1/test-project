import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    token: '',
  },
  reducers: {
    setData: (state, action) => {
        debugger
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.token = action.payload.token;
    },
   
  },
});

export const {
    setData,
} = userSlice.actions;

export default userSlice.reducer;
