import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from '@app/types/auth';

type Auth = {
  user: User | null;
};

const initialState: Auth = {
  user: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const {setUser} = AuthSlice.actions;
export default AuthSlice.reducer;
