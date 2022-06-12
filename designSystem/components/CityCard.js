import React, {useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  fontSizeSmall,
  fontSizeMedium,
  fontSizeXLarge,
  fontSizeXXXLarge,
} from '../assets/fontSize';
import {spacingXXSmall, spacingXSmall, spacingSmall} from '../assets/spacing';
import {baseBorderRadius} from '../assets/borderRadius';
import {white, darkAzure, lightAzure, darkGray} from '../assets/colors';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {fetchWeatherAction} from '../../store/slices/weatherSlice';
import {useDispatch} from 'react-redux';
import {useGetCityWeatherByNameQuery} from '../../services/getWeather';

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

const CityCard = ({city, image, onPress}) => {
  // const data = useGetCityWeatherByNameQuery('london');

  // console.log(data);

  /*
    Possible weather conditions
    1 - Clouds
    2 - Clear
    3 - Snow
    4 - Rain
    5 - Drizzle
    6 - Thunderstorm
    For other cases use http://openweathermap.org/img/wn/${data.weather.icon}
    to get icon
  */

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[darkAzure, lightAzure]}
        style={{borderRadius: baseBorderRadius, backgroundColor: darkGray}}
        start={{x: 0, y: 1}}>
        <Box>
          <DataBox>
            <CityText>Catania</CityText>
            <DateText>12 giugno</DateText>
            <DateText>2022</DateText>
            <HourText>01:54</HourText>
          </DataBox>

          <Image source={image} />
          <TemperatureText>28°</TemperatureText>
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CityCard;
