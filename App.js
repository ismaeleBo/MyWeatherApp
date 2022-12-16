import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import CityScreen from './app/screens/CityScreen';
import store, { persistor } from './app/store';
import { Provider, useSelector } from 'react-redux';
import SignupScreen from './app/screens/SignupScreen';
import LoginScreen from './app/screens/LoginScreen';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WithSplashScreen } from './app/screens/WithSplashScreen';
import LoginOrSignupScreen from './app/screens/LoginOrSignupScreen';
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('username', () => {
      setTimeout(() => {
        setIsAppReady(true);
      }, 3000);
    });
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={'Welcome'}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name='Welcome' component={LoginOrSignupScreen} />
              <Stack.Screen name='Signup' component={SignupScreen} />
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='City' component={CityScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </WithSplashScreen>
  );
};

const AppWithProviders = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithProviders;
