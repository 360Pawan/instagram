import storage from '@react-native-firebase/storage';

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
    const task = await storage()
      .ref('/posts/images')
      .putFile(image)
      .on('state_changed', snapshot => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 1000;

        console.log(progress);
      });

    console.log('==========', task);
  } catch (error) {
    console.log(error);
  }
};
