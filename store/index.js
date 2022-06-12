import {configureStore} from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import favouriteCitiesReduces from './slices/favouriteCitiesSlice';
import {weatherApi} from '../services/getWeather';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favouriteCities: favouriteCitiesReduces,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);

export default store;
