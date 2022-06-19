import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeCity} from '../store/slices/favouriteCitiesSlice';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {useGetCityWeatherByNameQuery} from '../services/getWeather';
import {getMonthName, getFullHour, getFullDay} from '../utils';
import clouds from '../assets/images/cloudy.png';
import clear from '../assets/images/sunny.png';
import rain from '../assets/images/rain.png';
import sunAndRain from '../assets/images/sun-and-rain.png';
import trash from '../assets/icons/trash.png';
import moon from '../assets/images/moon.png';

import {
  fontSizeSmall,
  fontSizeMedium,
  fontSizeXLarge,
  fontSize4XLarge,
} from '../assets/fontSize';
import {
  spacingXXSmall,
  spacingXSmall,
  spacingSmall,
  spacingMedium,
} from '../assets/spacing';
import {
  white,
  darkAzure,
  lightAzure,
  darkGray,
  darkBlue,
  lightGray,
  darkRed,
  lightRed,
  lightBlue,
} from '../assets/colors';
import {baseBorderRadius} from '../assets/borderRadius';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  margin-bottom: ${spacingSmall}px;
`;

const Box = styled.View`
  padding: ${spacingSmall}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ErrorBox = styled.View`
  padding: ${spacingMedium}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DataBox = styled.View`
  align-items: flex-start;
  flex-shrink: 1;
  z-index: 10;
  max-width: 50%;
`;

const ErrorText = styled.Text`
  font-size: ${fontSizeXLarge}px;
  color: ${white};
  font-family: 'Poppins-SemiBold';
`;

const CityText = styled.Text`
  font-size: ${fontSizeXLarge}px;
  color: ${white};
  font-family: 'Poppins-SemiBold';
`;

const DateText = styled.Text`
  font-size: ${fontSizeMedium}px;
  font-family: 'Poppins-Medium';
  color: ${white};
`;

const HourText = styled.Text`
  margin-top: ${spacingXSmall}px;
  font-size: ${fontSizeSmall}px;
  font-family: 'Poppins-Light';
  color: ${white};
`;

const TemperatureText = styled.Text`
  font-size: ${fontSize4XLarge}px;
  font-family: 'Poppins-Bold';
  color: ${white};
  margin-left: ${spacingXXSmall}px;
  z-index: 10;
`;

const WeatherImage = styled.Image`
  position: absolute;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

const RemoveIcon = styled.Image`
  height: 50px;
  width: 50px;
`;

const CityCard = ({city}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [deleteWhenError, setDeleteWhenError] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const {data, isError, refetch} = useGetCityWeatherByNameQuery(
    city.toLowerCase(),
  );

  const getWeatherIcon = useCallback(() => {
    if (
      data &&
      data.isNight &&
      (data.weather === 'Clear' || data.weather === 'Drizzle')
    ) {
      return moon;
    }
    if (data && data.weather) {
      const image =
        data.weather === 'Clouds'
          ? clouds
          : data.weather === 'Clear'
          ? clear
          : data.weather === 'Rain'
          ? rain
          : data.weather === 'Drizzle'
          ? sunAndRain
          : {
              uri: `http://openweathermap.org/img/wn/${data.weather.icon}`,
            };
      return image;
    }
  }, [data]);

  const weatherIcon = getWeatherIcon();

  /*
    Possible weather conditions
    1 - Clouds
    2 - Clear
    3 - Snow
    4 - Rain
    5 - Drizzle
    6 - Thunderstorm
    For other cases use http://openweathermap.org/img/wn/${data.weather.icon}
    to get icons
  */

  const getGradientColors = useCallback(() => {
    if (data && data.isNight && data.weather !== 'Clouds') {
      return [darkBlue, lightBlue];
    }
    if (data && data.weather) {
      const colors =
        data.weather === 'Clouds'
          ? [darkGray, lightGray]
          : data.weather === 'Clear'
          ? [darkAzure, lightAzure]
          : [darkBlue, lightAzure];
      return colors;
    }
  }, [data]);

  const handleRemoveCity = useCallback(() => {
    dispatch(removeCity(city));
    setIsRemoving(false);
  }, [dispatch, city]);

  const handlePress = useCallback(() => {
    if (data && data.time) {
      navigation.navigate({
        name: 'City',
        params: {
          city,
          colors: getGradientColors(),
          weather: data.weather,
          time: data.time,
          temp: Math.round(data.temp),
          icon: weatherIcon,
        },
      });
    }
  }, [city, data, getGradientColors, navigation, weatherIcon]);

  return (
    <Container>
      {data &&
        data.temp &&
        data.weather &&
        data.time &&
        !isError &&
        !isRemoving && (
          <TouchableOpacity
            onPress={handlePress}
            onLongPress={() => setIsRemoving(true)}>
            <LinearGradient
              colors={getGradientColors()}
              style={{
                borderRadius: baseBorderRadius,
                backgroundColor: darkGray,
              }}
              start={{x: 0, y: 1}}>
              <Box>
                <DataBox>
                  <CityText>{city}</CityText>
                  <DateText>{getFullDay(data.time)}</DateText>
                  <DateText>{getMonthName(data.time)}</DateText>
                  <HourText>{getFullHour(data.time)}</HourText>
                </DataBox>

                <WeatherImage source={weatherIcon} />
                <TemperatureText>{Math.round(data.temp)}°</TemperatureText>
              </Box>
            </LinearGradient>
          </TouchableOpacity>
        )}
      {isError && !deleteWhenError && (
        <TouchableOpacity
          onPress={refetch}
          onLongPress={() => {
            setIsRemoving(true);
            setDeleteWhenError(true);
          }}>
          <LinearGradient
            colors={[darkRed, lightRed]}
            start={{x: 0, y: 1}}
            style={{borderRadius: baseBorderRadius, backgroundColor: darkGray}}>
            <ErrorBox>
              <ErrorText>There is an error, press to retry</ErrorText>
            </ErrorBox>
          </LinearGradient>
        </TouchableOpacity>
      )}
      {isRemoving && (
        <TouchableOpacity onPress={handleRemoveCity}>
          <LinearGradient
            colors={[darkRed, lightRed]}
            start={{x: 0, y: 1}}
            style={{borderRadius: baseBorderRadius, backgroundColor: darkGray}}>
            <ErrorBox>
              <ErrorText>Press to remove</ErrorText>
              <RemoveIcon source={trash} />
            </ErrorBox>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default CityCard;
