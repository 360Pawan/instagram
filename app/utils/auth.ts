import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

export const signUpUser = async ({
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

    return {id: user.uid, name: name, email: user.email};
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      Snackbar.show({
        text: 'That email address is already in use!',
        backgroundColor: '#FF8080',
      });
    } else if (error.code === 'auth/invalid-email') {
      Snackbar.show({
        text: 'That email address is invalid!',
        backgroundColor: '#FF8080',
      });
    } else if (error.code === 'auth/weak-password') {
      Snackbar.show({
        text: 'The password is weak!',
        backgroundColor: '#FF8080',
      });
    } else {
      Snackbar.show({
        text: 'Error creating user!',
        backgroundColor: '#FF8080',
      });
    }
  }

  return null;
};
