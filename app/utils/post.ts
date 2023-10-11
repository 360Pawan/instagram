import {nanoid} from 'nanoid';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';

import {fetchCurrentUser} from './auth';

export const addPost = async ({
  image,
  location,
  description,
}: {
  image: string;
  location: string;
  description: string;
}) => {
  try {
    return new Promise(async (resolve, reject) => {
      const user = firebase.auth().currentUser;

      if (!user) {
        return;
      }

      const task = storage().ref(`/posts/images/${user.uid}`).putFile(image);

      task.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.error('Error uploading image:', error);
          reject(error);
        },
        async () => {
          try {
            const id = nanoid();
            const url = await task.snapshot?.ref.getDownloadURL();
            const userDetails = await fetchCurrentUser(user.uid);

            await firebase
              .app()
              .database(
                'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
              )
              .ref(`/posts/${id}`)
              .set({
                id: id,
                imageUrl: url,
                location,
                description,
                author: userDetails.name,
                authorId: userDetails.id,
              });

            resolve(true);
          } catch (error) {
            console.error(error);
            reject(error);
          }
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = async () => {
  return await firebase
    .app()
    .database(
      'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/posts')
    .once('value', snapshot => snapshot.val());
};

export const likePost = async (post: any) => {
  return await firebase
    .app()
    .database(
      'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref(`/posts/${post.id}`)
    .set(post);
};

export const dislikePost = async (post: any) => {
  return await firebase
    .app()
    .database(
      'https://instagram-1aa92-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref(`/posts/${post.id}`)
    .set(post);
};
