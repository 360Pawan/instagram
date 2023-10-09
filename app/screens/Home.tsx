import {StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Post from '@app/components/Post';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const arr = ['1', ' 2', '3', '4'];

  return (
    <SafeAreaView>
      <FlatList
        data={arr}
        renderItem={item => <Post />}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
