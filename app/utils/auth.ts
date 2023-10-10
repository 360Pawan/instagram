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
      .set({name, email});

    return {id: user.uid, name, email: user.email};
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

    return null;
  }
};

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const {user} = await auth().signInWithEmailAndPassword(email, password);

    const userDetails = await fetchCurrentUser(user.uid);

    return userDetails;
  } catch (error: any) {
    if (error.code === 'auth/invalid-login') {
      Snackbar.show({
        text: 'Invalid credential.',
        backgroundColor: '#FF8080',
      });
    }

    return null;
  }
};

export const fetchCurrentUser = async (id: string) => {
  try {
    const userDetails = await firebase
      .app()
      .database(
        'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${id}`)
      .once('value', snapshot => snapshot.val());

    return {id: id, ...userDetails.val()};
  } catch (error: any) {
    Snackbar.show({
      text: 'Error fetching user.',
      backgroundColor: '#FF8080',
    });

    return null;
  }
};

export const signOutUser = async () => {
  try {
    await auth().signOut();

    return true;
  } catch (error) {
    Snackbar.show({
      text: 'Error signing out user!',
      backgroundColor: '#FF8080',
    });

    return false;
  }
};
