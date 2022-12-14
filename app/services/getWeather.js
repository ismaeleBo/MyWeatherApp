import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OPEN_WEATHER_KEY } from '@env';
import { getTimeByTimezone } from '../utils';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.openweathermap.org/data/2.5',
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getCityWeatherByName: build.query({
      query: (city) => ({
        url: `weather?q=${city}&appid=${OPEN_WEATHER_KEY}&units=metric`,
      }),
      transformResponse: (response) => {
        const time = getTimeByTimezone(response.timezone);
        return {
          temp: response.main.temp,
          weather: response.weather[0].main,
          time,
          isNight: time.getHours() >= 18 || time.getHours() < 6,
        };
      },
    }),
    getLocationForecast: build.query({
      query: (lat, lon) => ({
        url: `/forecast/hourly?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}`,
      }),
    }),
  }),
});

export const { useGetCityWeatherByNameQuery, useGetLocationForecast } =
  weatherApi;
