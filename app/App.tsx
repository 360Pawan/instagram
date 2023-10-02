import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Text style={styles.text}>Hola</Text>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({text: {fontSize: 20}});

export default App;
