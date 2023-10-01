import React from 'react';
import {StyleSheet, Text} from 'react-native';

function App(): JSX.Element {
  return (
    <>
      <Text style={styles.text}>Hola</Text>
    </>
  );
}

const styles = StyleSheet.create({text: {fontSize: 20}});

export default App;
