import {View, Text} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Login = () => {
  auth()
    .createUserWithEmailAndPassword(
      'jane.doe@example.com',
      'SuperSecretPassword!',
    )
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
