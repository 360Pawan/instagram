import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

const Input = (props: TextInputProps) => {
  return <TextInput style={styles.input} {...props} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    marginBottom: 20,
    borderColor: '#FFCF96',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
  },
});
