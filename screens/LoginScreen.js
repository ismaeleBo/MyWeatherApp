import React from 'react';
import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { spacingXSmall, spacingSmall, spacingMedium } from '../assets/spacing';
import { fontSizeLarge, fontSize5XLarge } from '../assets/fontSize';
import styled from 'styled-components/native';
import { bluesky, white, green } from '../assets/colors';
import LoginForm from '../components/LoginForm';

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

const LoginScreen = () => {
  const colors = [bluesky, green];

  return (
    <LinearGradient colors={colors} style={styles.linearGradient}>
      <Container>
        <Heading>Insert your password</Heading>
        <LoginForm />
      </Container>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default LoginScreen;
