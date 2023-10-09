import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Home = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  return (
    <View>
      <Text>Hello from Home Screen</Text>
      <TouchableOpacity onPress={() => navigation?.navigate('AddPost')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
