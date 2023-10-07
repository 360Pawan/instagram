import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

import {RootState} from '@app/store/store';

const CustomHeader = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Instagram</Text>
      <View style={styles.actions}>
        {user ? (
          <>
            <TouchableOpacity>
              <Text style={styles.text}>Add Post</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logout" size={20} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
