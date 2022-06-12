import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCity} from '../store/slices/favouriteCitiesSlice';
import {fetchWeatherAction, setCity} from '../store/slices/weatherSlice';
import CityCard from '../designSystem/components/CityCard';
import {primaryBlue} from '../designSystem/assets/colors';
import {fontSizeXXLarge} from '../designSystem/assets/fontSize';
import {
  spacingSmall,
  spacingMedium,
  spacingXLarge,
} from '../designSystem/assets/spacing';
import styled from 'styled-components/native';
import sunny from '../designSystem/images/sunny.png';
import AddNewCity from '../designSystem/components/AddNewCity';

const Container = styled.View`
  padding-left: ${spacingSmall}px;
  padding-right: ${spacingSmall}px;
  padding-top: ${spacingXLarge}px;
  padding-bottom: ${spacingXLarge}px;
`;

const Box = styled.View`
  margin-top: ${spacingMedium}px;
`;

const Title = styled.Text`
  color: ${primaryBlue};
  font-size: ${fontSizeXXLarge}px;
  font-family: 'Poppins-Bold';
  text-align: center;
  margin-bottom: ${spacingMedium}px;
`;

const HomeScreen = ({navigation}) => {
  return (
    <Container>
      <Title>Good morning!</Title>
      <AddNewCity />
      <Box>
        <CityCard
          city={'Catania'}
          image={sunny}
          onPress={() => navigation.navigate('City')}
        />
      </Box>
    </Container>
  );
};

export default HomeScreen;