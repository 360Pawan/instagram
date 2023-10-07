import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

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
    signInUser(
      state,
      action: PayloadAction<{email: string; password: string}>,
    ) {
      console.log(action.payload);

      auth()
        .createUserWithEmailAndPassword(
          'jane.doe@example.com',
          'SuperSecretPassword!',
        )
        .then()
        .catch(error => {
          console.log(error);

          Snackbar.show({
            text: 'Error creating user',
            backgroundColor: '#FF8080',
          });
        });
    },
  },
});

export const {signInUser} = AuthSlice.actions;
export default AuthSlice.reducer;
