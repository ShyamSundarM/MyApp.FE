import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import useApi from '../hooks/useApi';
import {RegisterResponse} from '../Types/Types';
import {showMessage} from 'react-native-flash-message';
import {useAuthStore} from '../state/store';

export default function Register() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reEnterPasswordError, setReEnterPasswordError] = useState('');
  const {apiCall, isLoading} = useApi();
  const {setCurrentTab} = useAuthStore();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard when register button is clicked

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

    if (!fullName) {
      setFullNameError('Full name cannot be empty.');
      isValid = false;
    } else if (fullName.length < 5) {
      setFullNameError('Full name must be at least 5 characters long.');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!password) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        'Password must have at least one uppercase, one lowercase, one number, and be at least 6 characters long.',
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!reEnterPassword) {
      setReEnterPasswordError('Please re-enter your password.');
      isValid = false;
    } else if (reEnterPassword !== password) {
      setReEnterPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setReEnterPasswordError('');
    }

    if (isValid) {
      try {
        const response = await apiCall<RegisterResponse>(
          '/api/auth/register',
          'POST',
          {
            emailId: email,
            fullName,
            password,
          },
        );

        if (response.status === 200) {
          const {respCode, userId} = response.data;
          var message = '';
          if (respCode === 0) {
            message = 'Email already exists';
          } else if (respCode === 1) {
            message = 'Registration successful';
          }
          showMessage({
            message: message,
            type: respCode === 1 ? 'success' : 'warning',
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
          });
          if (respCode === 1) {
            setCurrentTab(0); // Switch to login tab after successful registration
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

  const handleEmailChange = text => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handleFullNameChange = text => {
    setFullName(text);
    if (fullNameError) setFullNameError('');
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleReEnterPasswordChange = text => {
    setReEnterPassword(text);
    if (reEnterPasswordError) setReEnterPasswordError('');
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        label="Email ID"
        mode="outlined"
        value={email}
        autoComplete="email"
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        style={styles.input}
        error={!!emailError}
      /> */}
      {/* {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        label="Full Name"
        mode="outlined"
        value={fullName}
        onChangeText={handleFullNameChange}
        style={styles.input}
        error={!!fullNameError}
      />
      {fullNameError ? (
        <Text style={styles.errorText}>{fullNameError}</Text>
      ) : null}
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        style={styles.input}
        error={!!passwordError}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        label="Re-enter Password"
        mode="outlined"
        secureTextEntry
        value={reEnterPassword}
        onChangeText={handleReEnterPasswordChange}
        style={styles.input}
        error={!!reEnterPasswordError}
      />
      {reEnterPasswordError ? (
        <Text style={styles.errorText}>{reEnterPasswordError}</Text>
      ) : null}
      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
