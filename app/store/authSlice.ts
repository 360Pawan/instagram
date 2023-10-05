import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthType = {
  user: string;
};

const initialState: AuthType = {
  user: 'Pawan',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

export const {setUser} = AuthSlice.actions;
export default AuthSlice.reducer;
