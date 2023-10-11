import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import Input from '@app/components/Input';
import {signInUser} from '@app/utils/auth';
import {setUser} from '@app/store/authSlice';
import PrimaryButton from '@app/components/Button';

const SignIn = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [signInDetails, setSignInDetails] = useState({email: '', password: ''});

  const handleSignIn = async () => {
    if (!signInDetails.email || !signInDetails.password) {
      return Snackbar.show({
        text: 'Both fields are required',
        backgroundColor: '#FF8080',
      });
    }

    setLoading(true);

    try {
      const userDetails = await signInUser(signInDetails);

      dispatch(setUser(userDetails));

      if (userDetails) {
        navigation?.navigate('Home');
        setSignInDetails({email: '', password: ''});
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        text: 'Error signing user',
        backgroundColor: '#FF8080',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.text}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={signInDetails.email}
          onChangeText={text =>
            setSignInDetails({...signInDetails, email: text})
          }
        />
        <Input
          placeholder="Password"
          value={signInDetails.password}
          onChangeText={text =>
            setSignInDetails({...signInDetails, password: text})
          }
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <PrimaryButton title="Sign In" onPress={handleSignIn} />
        )}
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF8080',
  },

  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
});
