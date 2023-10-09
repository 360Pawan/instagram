import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '@app/store/store';
import {signOutUser} from '@app/utils/auth';
import {setUser} from '@app/store/authSlice';

const CustomHeader = ({
  navigation,
  route,
}: {
  navigation?: {navigate: (routeName: string) => void};
  route?: {
    key: string;
    name: string;
    params: string;
    path?: undefined;
  };
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  const signOut = async () => {
    const signedOut = await signOutUser();

    if (signedOut) {
      dispatch(setUser(null));
      navigation?.navigate('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => (user ? navigation?.navigate('Home') : null)}>
        <Text style={styles.text}>Instagram</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        {user ? (
          <>
            <TouchableOpacity onPress={() => navigation?.navigate('AddPost')}>
              <Text style={styles.text}>Add Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut}>
              <Icon name="logout" size={20} />
            </TouchableOpacity>
          </>
        ) : route?.name === 'SignIn' ? (
          <TouchableOpacity onPress={() => navigation?.navigate('SignUp')}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation?.navigate('SignIn')}>
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF8080',
    flexDirection: 'row',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#a9a9a9',
  },

  text: {
    fontSize: 18,
    fontWeight: '600',
  },

  actions: {flexDirection: 'row', gap: 8, alignItems: 'center'},
});
