import React from 'react';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import { useSelector } from 'react-redux';

const LoginOrSignupScreen = () => {
  const { isLogged } = useSelector((state) => state.user);

  return isLogged ? <LoginScreen /> : <SignupScreen />;
};

export default LoginOrSignupScreen;
