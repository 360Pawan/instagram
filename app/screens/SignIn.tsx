import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@app/store/store';

const SignIn = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <View>
      <Text>Hello from sign in screen {user}</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
