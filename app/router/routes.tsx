import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {RootState} from '@app/store/store';
import SignIn from '@app/screens/SignIn';
import SignUp from '@app/screens/SignUp';
import Home from '@app/screens/Home';
import AddPost from '@app/screens/AddPost';
import CustomHeader from '@app/layout/CustomHeader';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{header: CustomHeader}}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddPost" component={AddPost} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
