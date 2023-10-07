import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import Input from '@app/components/Input';
import PrimaryButton from '@app/components/Button';
import Snackbar from 'react-native-snackbar';
import {signInUser} from '@app/store/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();

  const [signInDetails, setSignInDetails] = useState({email: '', password: ''});

  const handleSignIn = () => {
    if (!signInDetails.email || !signInDetails.password) {
      return Snackbar.show({
        text: 'Both fields are required',
        backgroundColor: '#FF8080',
      });
    }

    dispatch(signInUser(signInDetails));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.text}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={signInDetails.email}
          onChangeText={text =>
            setSignInDetails({...signInDetails, email: text})
          }
        />
        <Input
          placeholder="Password"
          value={signInDetails.password}
          onChangeText={text =>
            setSignInDetails({...signInDetails, password: text})
          }
        />
        <PrimaryButton title="Sign In" onPress={handleSignIn} />
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF8080',
  },

  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
});
