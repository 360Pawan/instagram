import PrimaryButton from '@app/components/Button';
import Input from '@app/components/Input';
import {addPost} from '@app/utils/post';
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

const AddPost = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [postDetails, setPostDetails] = useState({
    image: '',
    location: '',
    description: '',
  });

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;

        if (imageUri) {
          setPostDetails({...postDetails, image: imageUri});
          setIsVisible(false);
        }
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;

        if (imageUri) {
          setPostDetails({...postDetails, image: imageUri});
          setIsVisible(false);
        }
      }
    });
  };

  const uploadPost = async () => {
    if (
      !postDetails.description ||
      !postDetails.image ||
      !postDetails.location
    ) {
      return Snackbar.show({
        text: 'Fields are required.',
        backgroundColor: '#FF8080',
      });
    }

    console.log(postDetails);

    await addPost(postDetails);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => setIsVisible(false)}>
          <View style={styles.modalView}>
            <View>
              <TouchableOpacity onPress={openCamera}>
                <Text style={styles.text}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openImagePicker}>
                <Text style={styles.text}>Open File</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.cancelText}>close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      {postDetails.image ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: postDetails.image, width: 0, height: 0}}
          />
        </View>
      ) : null}
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text style={styles.uploadButton}>Upload Photo</Text>
      </TouchableOpacity>
      <Input
        placeholder="Location"
        value={postDetails.location}
        onChangeText={text => setPostDetails({...postDetails, location: text})}
      />
      <Input
        placeholder="Description"
        value={postDetails.description}
        onChangeText={text =>
          setPostDetails({...postDetails, description: text})
        }
      />
      <PrimaryButton title="Add post" onPress={uploadPost} />
    </ScrollView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
    minHeight: 150,
    justifyContent: 'space-between',
  },

  imageContainer: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  uploadButton: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    borderColor: '#FF8080',
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  cancelText: {
    fontSize: 18,
    textAlign: 'right',
  },
});
