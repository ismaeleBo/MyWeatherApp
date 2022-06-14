import React, {useCallback} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  fontSizeSmall,
  fontSizeMedium,
  fontSizeXLarge,
  fontSizeXXXLarge,
} from '../assets/fontSize';
import {spacingXXSmall, spacingXSmall, spacingSmall} from '../assets/spacing';
import {baseBorderRadius} from '../assets/borderRadius';
import {
  white,
  darkAzure,
  lightAzure,
  darkGray,
  darkBlue,
} from '../assets/colors';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {useGetCityWeatherByNameQuery} from '../services/getWeather';
import {getMonthName, getFullHour, getFullDay} from '../utils';
import clouds from '../assets/images/cloudy.png';
import clear from '../assets/images/sunny.png';
import sunAndRain from '../assets/images/sun-and-rain.png';

const Container = styled.View`
  margin-bottom: ${spacingSmall}px;
`;

const Box = styled.View`
  padding: ${spacingSmall}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DataBox = styled.View`
  align-items: flex-start;
  flex-shrink: 1;
`;

const ErrorText = styled.Text`
  font-size: ${fontSizeXLarge}px;
  color: ${darkBlue};
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
  font-size: ${fontSizeXXXLarge}px;
  font-family: 'Poppins-Bold';
  color: ${white};
  margin-left: ${spacingXXSmall}px;
`;

const CityCard = ({city, onPress}) => {
  const {data, isError, refetch} = useGetCityWeatherByNameQuery(
    city.toLowerCase(),
  );

  const getWeatherIcon = useCallback(() => {
    if (data && data.weather) {
      const image =
        data.weather === 'Clouds'
          ? clouds
          : data.weather === 'Clear'
          ? clear
          : data.weather === 'Rain'
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

  return (
    <Container>
      {data && data.temp && data.weather && data.time && !isError && (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={[darkAzure, lightAzure]}
            style={{borderRadius: baseBorderRadius, backgroundColor: darkGray}}
            start={{x: 0, y: 1}}>
            <Box>
              <DataBox>
                <CityText>{city}</CityText>
                <DateText>{getFullDay(data.time)}</DateText>
                <DateText>{getMonthName(data.time)}</DateText>
                <HourText>{getFullHour(data.time)}</HourText>
              </DataBox>

              <Image source={weatherIcon} />
              <TemperatureText>{Math.round(data.temp)}°</TemperatureText>
            </Box>
          </LinearGradient>
        </TouchableOpacity>
      )}
      {isError && (
        <TouchableOpacity onPress={refetch}>
          <Box>
            <ErrorText>There is an error, press to retry</ErrorText>
          </Box>
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default CityCard;
