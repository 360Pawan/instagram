import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@app/store/store';
import {likePost} from '@app/utils/post';

const Post = ({
  author,
  authorId,
  description,
  imageUrl,
  location,
  id,
  likes,
  getPosts,
}: {
  author: string;
  authorId: string;
  description: string;
  imageUrl: string;
  location: string;
  id: string;
  likes: string[];
  getPosts: () => void;
}) => {
  const {user} = useSelector((state: RootState) => state.auth);

  const handlePostLike = async () => {
    if (!user) {
      return;
    }

    const post = {
      author,
      authorId,
      description,
      imageUrl,
      location,
      id,
      likes: !likes ? [user.id] : [...likes, user.id],
    };

    await likePost(post);
    getPosts();
  };

  const handlePostDislike = async () => {
    if (!user || !likes) {
      return;
    }

    const newLikes = likes.filter(like => like !== user.id);

    const post = {
      author,
      authorId,
      description,
      imageUrl,
      location,
      id,
      likes: newLikes,
    };

    await likePost(post);
    getPosts();
  };

  return (
    <View style={styles.item}>
      <View style={styles.textWrapper}>
        <Icon name="location-arrow" size={30} />
        <Text style={styles.text}>{location}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
            width: 0,
            height: 0,
          }}
        />
      </View>
      <View style={styles.actionContainer}>
        {likes?.some(like => like === user?.id) ? (
          <TouchableOpacity onPress={handlePostDislike}>
            <Icon name="thumbs-up" size={30} color="blue" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePostLike}>
            <Icon name="thumbs-o-up" size={30} />
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{!likes ? 0 : likes.length}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Icon name="user" size={30} />
        <Text style={styles.text}>{author}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Icon name="sticky-note" size={30} />
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginBottom: 10,
  },

  actionContainer: {
    flexDirection: 'row',
    gap: 5,
  },

  imageContainer: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
