import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AddPost from './screens/AddPost';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddPost" component={AddPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
