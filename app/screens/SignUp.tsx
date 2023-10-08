import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import Input from '@app/components/Input';
import PrimaryButton from '@app/components/Button';
import Snackbar from 'react-native-snackbar';
import {signUpUser} from '@app/store/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();

  const [signUpDetails, setSignUpDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = () => {
    if (
      !signUpDetails.name ||
      !signUpDetails.email ||
      !signUpDetails.password
    ) {
      return Snackbar.show({
        text: 'Both fields are required',
        backgroundColor: '#FF8080',
      });
    }

    dispatch(signUpUser(signUpDetails));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.text}>Sign up for a new account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Name"
          value={signUpDetails.name}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, name: text})
          }
        />
        <Input
          placeholder="Email"
          value={signUpDetails.email}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, email: text})
          }
        />
        <Input
          placeholder="Password"
          value={signUpDetails.password}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, password: text})
          }
        />
        <PrimaryButton title="Sign Up" onPress={handleSignUp} />
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
