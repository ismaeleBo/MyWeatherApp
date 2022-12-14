import React from 'react';
import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { spacingXSmall, spacingSmall, spacingMedium } from '../assets/spacing';
import { fontSizeLarge, fontSize5XLarge } from '../assets/fontSize';
import styled from 'styled-components/native';
import { orange, white, green } from '../assets/colors';
import SignupForm from '../components/SignupForm';

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

const SignupScreen = () => {
  const colors = [orange, green];

  return (
    <LinearGradient colors={colors} style={styles.linearGradient}>
      <Container>
        <Heading>Create an account</Heading>
        <SignupForm />
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
