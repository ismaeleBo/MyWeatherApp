import {configureStore} from '@reduxjs/toolkit';
import favouriteCitiesReduces from './slices/favouriteCitiesSlice';
import {weatherApi} from '../services/getWeather';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    favouriteCities: favouriteCitiesReduces,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      weatherApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
