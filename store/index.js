import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favouriteCitiesReducer from './slices/favouriteCitiesSlice';
import userReducer from './slices/userSlice';
import { weatherApi } from '../services/getWeather';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['username', 'password', 'value'],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedCitiesReducer = persistReducer(
  persistConfig,
  favouriteCitiesReducer
);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
  favouriteCities: persistedCitiesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      weatherApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
