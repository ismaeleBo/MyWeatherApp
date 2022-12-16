import React, { useCallback } from 'react';
import { StyleSheet, Switch, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { spacingXSmall, spacingSmall, spacingMedium } from '../assets/spacing';
import {
  fontSizeLarge,
  fontSize5XLarge,
  fontSizeMedium,
} from '../assets/fontSize';
import styled from 'styled-components/native';
import {
  orange,
  white,
  green,
  primaryBlue,
  darkGray,
  lightBlue,
  lightAzure,
  darkAzure,
} from '../assets/colors';
import SignupForm from '../components/SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBiometry } from '../store/slices/userSlice';

const Container = styled.View`
  padding-top: ${spacingXSmall}px;
  padding-left: ${spacingSmall}px;
  padding-right: ${spacingSmall}px;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Heading = styled.Text`
  font-size: ${fontSizeLarge}px;
  font-family: 'Poppins-Medium';
  color: ${white};
  text-align: center;
  margin-bottom: ${spacingSmall}px;
`;

const BiometryContainer = styled.View`
  margin-top: ${spacingMedium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BiometryText = styled.Text`
  font-size: ${fontSizeMedium}px;
  font-family: 'Poppins-Medium';
`;

const ToggleBiometry = styled.Switch``;

const SignupScreen = () => {
  const colors = [orange, green];

  const { biometryActive } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleBiometryToggle = () => dispatch(toggleBiometry());

  return (
    <LinearGradient colors={colors} style={styles.linearGradient}>
      <Container>
        <Heading>Create an account</Heading>
        <SignupForm />
        <BiometryContainer>
          <BiometryText>Use biometry to access</BiometryText>
          <ToggleBiometry
            trackColor={{ false: darkGray, true: darkAzure }}
            thumbColor={white}
            ios_backgroundColor='#3e3e3e'
            onValueChange={handleBiometryToggle}
            value={biometryActive}
          />
        </BiometryContainer>
      </Container>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default SignupScreen;
