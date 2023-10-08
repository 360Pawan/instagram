import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
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
    signUpUser(
      state,
      action: PayloadAction<{name: string; email: string; password: string}>,
    ) {
      const user = createUser(action.payload);
    },

    signInUser(
      state,
      action: PayloadAction<{email: string; password: string}>,
    ) {
      const {email, password} = action.payload;
    },
  },
});

export const {signUpUser, signInUser} = AuthSlice.actions;
export default AuthSlice.reducer;

const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);

    await firebase
      .app()
      .database(
        'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${user.uid}`)
      .set({name: name, email: email});

    return user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return Snackbar.show({
        text: 'That email address is already in use!',
        backgroundColor: '#FF8080',
      });
    }

    if (error.code === 'auth/invalid-email') {
      return Snackbar.show({
        text: 'That email address is invalid!',
        backgroundColor: '#FF8080',
      });
    }

    Snackbar.show({
      text: 'Error creating user',
      backgroundColor: '#FF8080',
    });
  }
};

// .then(response => {
//   // console.log(response);

//   response.user.updateProfile({displayName: name}).then().catch();

//   firebase
//     .app()
//     .database(
//       'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
//     )
//     .ref(`/users/${response.user.uid}`)
//     .set({
//       name: name,
//       email: email,
//     })
//     .then(() => {
//       Snackbar.show({
//         text: 'Account created successfully.',
//         backgroundColor: '#005B41',
//       });
//     })
//     .catch(error => {
//       console.error(error);

//       Snackbar.show({
//         text: 'Error creating user',
//         backgroundColor: '#FF8080',
//       });
//     });
// })
// .catch(error => {
//
