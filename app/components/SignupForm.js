import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { fontSizeMedium } from '../assets/fontSize';
import { primaryBlue, white } from '../assets/colors';
import { fullBorderRadius } from '../assets/borderRadius';
import { spacingXSmall, spacingSmall } from '../assets/spacing';
import { addUser } from '../store/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import Keychain from 'react-native-keychain';

const Container = styled.View`
  flex-direction: column;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${primaryBlue};
  padding: ${spacingXSmall}px;};
  border-radius: ${fullBorderRadius}px;
  min-width: 50px;
`;

const SubmitButtonText = styled.Text`
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

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const createAccount = useCallback(async (value) => {
    // Dispatch addUser action
    dispatch(addUser(value));

    // Save password in keychain
    await Keychain.setGenericPassword(value.username, value.password, {
      service: 'user-service',
      accessControl: 'BiometryAny',
      accessible: 'AccessibleWhenPasscodeSetThisDeviceOnly',
    });

    Keyboard.dismiss();

    // Navigate to Home screen
    navigation.navigate('Home');
  });

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: createAccount,
  });

  return (
    <Container>
      <Input
        value={values.username}
        onChangeText={handleChange('username')}
        placeholder={'Insert a username'}
        maxLength={25}
      />
      <Input
        value={values.password}
        onChangeText={handleChange('password')}
        placeholder={'Insert a password'}
        maxLength={25}
        secureTextEntry={true}
        autoCapitalize='none'
      />
      <SubmitButton onPress={handleSubmit}>
        <SubmitButtonText>Submit</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default SignupForm;
