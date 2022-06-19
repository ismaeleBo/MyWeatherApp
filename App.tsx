import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CityScreen from './screens/CityScreen';
import store from './store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="City" component={CityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
