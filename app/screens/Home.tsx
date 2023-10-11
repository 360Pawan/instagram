import React, {useCallback, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Post from '@app/components/Post';
import {fetchPosts} from '@app/utils/post';
import {RootState} from '@app/store/store';
import {setPosts} from '@app/store/postSlice';
import {PostType} from '@app/types/auth';

const Home = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {posts} = useSelector((state: RootState) => state.posts);

  const getPosts = useCallback(async () => {
    const response = (await fetchPosts()).val();
    if (!response) {
      return;
    }

    const data: PostType[] = Object.values(response);
    dispatch(setPosts(data));
  }, [dispatch]);

  useEffect(() => {
    getPosts();
  }, [isFocused, getPosts]);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post {...item} getPosts={getPosts} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.text}>No posts to show</Text>}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {fontSize: 24, fontWeight: '600', textAlign: 'center', padding: 10},
});
