import React from 'react';
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

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  const { username, password } = useSelector((state) => state.user);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={username && password ? 'Login' : 'Signup'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='City' component={CityScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
