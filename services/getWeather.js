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
      transformResponse: response => {
        return {
          temp: response.main.temp,
          weather: response.weather[0].main,
          time: new Date(response.dt * 1000 + response.timezone * 1000),
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {useGetCityWeatherByNameQuery} = weatherApi;
