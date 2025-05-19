import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import useApi from '../hooks/useApi';
import {showMessage} from 'react-native-flash-message';
import {LoginResponse, RootStackParamList} from '../Types/Types';
import TokenService from '../helpers/TokenService';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Input, Text} from '@ui-kitten/components';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {apiCall, isLoading} = useApi();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard when login button is clicked

    let isValid = true;

    if (!email) {
      setEmailError('Email cannot be empty.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const response = await apiCall<LoginResponse>(
          '/api/auth/verify',
          'POST',
          {
            emailId: email,
            password,
          },
        );
        if (response.status === 200) {
          var message = '';
          const {token, respCode} = response.data;
          if (respCode === 0) {
            message = 'Login successful!';
            TokenService.saveToken(token);
          } else if (respCode === 1) {
            message = 'Invalid email';
          } else {
            message = 'Invalid password';
          }
          showMessage({
            message: message,
            type: respCode === 0 ? 'success' : 'warning',
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
          });
          if (respCode === 0) {
            // For example, you can use React Navigation to navigate to the home screen
            navigation.navigate({name: 'HomeDrawer', params: 'HomeDrawer'});
          }
        }
      } catch (error) {
        showMessage({
          message: error.message,
          type: 'danger',
          icon: 'auto',
          duration: 3000,
          hideStatusBar: true,
        });
      }
    }
  };

  const handleEmailChange = (text: React.SetStateAction<string>) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: React.SetStateAction<string>) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        {/* <TextInput
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={!!emailError}
          disabled={isLoading} 
        /> */}
        <Input
          placeholder="Email ID"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoComplete="email"
          disabled={isLoading}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        {/* <TextInput
          label="Password"
          value={password}
          autoComplete="password"
          onChangeText={handlePasswordChange}
          style={styles.input}
          secureTextEntry
          error={!!passwordError}
          disabled={isLoading} // Disable input when API call is happening
        /> */}
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>
      {/* <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        disabled={isLoading}
        loading={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});
