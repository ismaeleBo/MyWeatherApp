import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {white} from '../assets/colors';
import {fontSize3XLarge} from '../assets/fontSize';
import {spacingSmall, spacingXLarge} from '../assets/spacing';
import {useNavigation} from '@react-navigation/native';
import arrow from '../assets/icons/arrow-left.png';
import plus from '../assets/icons/plus-white.png';

const Title = styled.Text`
  color: ${white};
  font-size: ${fontSize3XLarge}px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`;

const Container = styled.View`
  padding-top: ${spacingXLarge}px;
  padding-left: ${spacingSmall}px;
  padding-right: ${spacingSmall}px;
  color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CityHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={arrow} />
      </TouchableOpacity>
      <Title>{title}</Title>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={plus} />
      </TouchableOpacity>
    </Container>
  );
};

export default CityHeader;
