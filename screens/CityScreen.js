import React from 'react';
import {StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CityHeader from '../components/CityHeader';
import {spacingXSmall, spacingSmall, spacingMedium} from '../assets/spacing';
import {fontSizeLarge, fontSize5XLarge} from '../assets/fontSize';
import styled from 'styled-components/native';
import {white} from '../assets/colors';
import {getFullDay, getMonthName} from '../utils';

const Container = styled.View`
  padding-top: ${spacingXSmall}px;
  padding-left: ${spacingSmall}px;
  padding-right: ${spacingSmall}px;
`;

const DateText = styled.Text`
  font-size: ${fontSizeLarge}px;
  font-family: 'Poppins-Medium';
  color: ${white};
  text-align: center;
  margin-bottom: ${spacingSmall}px;
`;

const WeatherText = styled.Text`
  font-size: ${fontSizeLarge}px;
  font-family: 'Poppins-Light';
  color: ${white};
  text-align: center;
  margin-bottom: ${spacingMedium}px;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TemperatureText = styled.Text`
  font-size: ${fontSize5XLarge}px;
  font-family: 'Poppins-Bold';
  color: ${white};
`;

const CityScreen = ({route}) => {
  const {city, colors, weather, time, temp, icon} = route.params;

  return (
    <LinearGradient colors={colors} style={styles.linearGradient}>
      <CityHeader title={city} />
      <Container>
        <DateText>{`${getFullDay(time)} ${getMonthName(time)}`}</DateText>
        <WeatherText>{weather}</WeatherText>
        <WeatherBox>
          <Image source={icon} />
          <TemperatureText>{temp}°</TemperatureText>
        </WeatherBox>
      </Container>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default CityScreen;
