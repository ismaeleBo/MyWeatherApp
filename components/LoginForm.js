import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useFormik } from 'formik';
import { fontSizeMedium } from '../assets/fontSize';
import { lightRed, primaryBlue, white } from '../assets/colors';
import { fullBorderRadius } from '../assets/borderRadius';
import { spacingXSmall, spacingSmall } from '../assets/spacing';
import Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';
import useBiometry from '../hooks/useBiometry';
import { useSelector } from 'react-redux';

const Container = styled.View`
  flex-direction: column;
`;

const Button = styled.TouchableOpacity`
  background-color: ${primaryBlue};
  padding: ${spacingXSmall}px;};
  border-radius: ${fullBorderRadius}px;
  min-width: 50px;
`;

const ButtonText = styled.Text`
  font-size: ${fontSizeMedium}px;
  text-transform: uppercase;
  font-family: 'Poppins-SemiBold';
  color: white;
  text-align: center;
`;

const Input = styled.TextInput`
  border: 2px solid ${primaryBlue};
  padding: ${spacingSmall}px;
  margin-bottom: ${spacingSmall}px;
  color: ${white};
`;

const ErrorMessage = styled.Text`
  font-size: ${fontSizeMedium}px;
  text-transform: uppercase;
  font-family: 'Poppins-SemiBold';
  color: ${lightRed};
  text-align: center;
  margin: ${spacingSmall}px 0;
`;

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [signupButtonVisible, setSignupButtonVisible] = useState(false);

  const biometry = useBiometry();
  const navigation = useNavigation();

  const handleSubmitWithBiometry = useCallback(async () => {
    try {
      // Get password using biometry
      const savedPassword = await biometry.authenticate();

      // If password is available, pass it to handleLogin
      handleLogin({ password: savedPassword });
    } catch {
      console.log('Biometry error');
      return;
    }
  });

  const { password: userPassword } = useSelector((state) => state.user);

  useEffect(() => {
    // Try to login using biometry
    if (biometry.available) handleSubmitWithBiometry();
  });

  const handleLogin = useCallback(async (value) => {
    // Hide error message
    setErrorMessage('');

    // If there is not a password saved in the store
    if (!userPassword) {
      // Show an error and a button to navigate to signup
      setErrorMessage('No credentials stored');
      setSignupButtonVisible(true);
      return;
    }

    // If the provided psw match with the psw saved in the store navigate to Home
    if (value.password === userPassword) return navigation.navigate('Home');

    // Else show wrong psw error
    setErrorMessage('Wrong password');

    Keyboard.dismiss();
  });

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: { password: '' },
    onSubmit: handleLogin,
  });

  return (
    <Container>
      <Input
        value={values.password}
        onChangeText={handleChange('password')}
        placeholder={'Insert a password'}
        maxLength={25}
        secureTextEntry={true}
        autoCapitalize='none'
      />
      {!signupButtonVisible && (
        <Button onPress={handleSubmit}>
          <ButtonText>Submit</ButtonText>
        </Button>
      )}
      {!errorMessage ? null : <ErrorMessage>{errorMessage}</ErrorMessage>}
      {signupButtonVisible && (
        <Button onPress={() => navigation.navigate('Signup')}>
          <ButtonText>Signup now!</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default LoginForm;
