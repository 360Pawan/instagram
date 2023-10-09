import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, View, Image} from 'react-native';

const Post = () => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>Location</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'file:///data/user/0/com.instagram/cache/rn_image_picker_lib_temp_ff899da5-7e6e-433c-af95-5f650f6d9ee7.jpg',
            width: 0,
            height: 0,
          }}
        />
      </View>
      <View style={styles.actionContainer}>
        <Icon name="like2" size={30} />
        <Text style={styles.text}>1</Text>
        <Icon name="like1" size={30} />
        <Icon name="dislike2" size={30} />
        <Text style={styles.text}>1</Text>
        <Icon name="dislike1" size={30} />
      </View>
      <Text style={styles.text}>Description</Text>
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

  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
