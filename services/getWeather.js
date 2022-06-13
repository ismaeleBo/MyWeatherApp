import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {OPEN_WEATHER_KEY} from '@env';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.openweathermap.org/data/2.5',
  }),
  tagTypes: [],
  endpoints: build => ({
    getCityWeatherByName: build.query({
      query: city => ({
        url: `weather?q=${city}&appid=${OPEN_WEATHER_KEY}&units=metric`,
      }),
    }),
  }),
});

// const transformWeatherData = response => {
//   const data = {};
//   data.temp = response.main.temp;
//   data.weather = response.weather[0].main;
//   data.time = new Date(response.dt * 1000 + response.timezone * 1000);
//   return response;
// };
// Export hooks for usage in functional components
export const {useGetCityWeatherByNameQuery} = weatherApi;
