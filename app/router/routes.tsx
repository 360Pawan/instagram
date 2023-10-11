import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootState} from '@app/store/store';
import SignIn from '@app/screens/SignIn';
import SignUp from '@app/screens/SignUp';
import Home from '@app/screens/Home';
import AddPost from '@app/screens/AddPost';
import CustomHeader from '@app/layout/CustomHeader';
import {fetchCurrentUser} from '@app/utils/auth';
import {setUser} from '@app/store/authSlice';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const isAuthenticated = firebase.auth().currentUser;

    const getUserDetails = async () => {
      if (isAuthenticated) {
        const userDetails = await fetchCurrentUser(isAuthenticated.uid);

        dispatch(setUser(userDetails));
      }
    };

    getUserDetails();
  }, [dispatch]);

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
