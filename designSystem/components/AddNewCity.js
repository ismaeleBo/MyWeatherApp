import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import plus from '../assets/icons/plus.png';
import {fontSizeXXLarge} from '../assets/fontSize';
import {spacingXSmall} from '../assets/spacing';
import {primaryBlue} from '../assets/colors';
import {useDispatch} from 'react-redux';
import AddCityModal from './AddCityModal';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Plus = styled.Image`
  margin-right: ${spacingXSmall}px;
  resize-mode: contain;
`;

const Label = styled.Text`
  font-size: ${fontSizeXXLarge}px;
  font-family: 'Poppins-SemiBold';
  color: ${primaryBlue};
  text-align: center;
  justify-content: space-between;
`;

const AddNewCity = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => null}>
        <Container>
          <Plus source={plus} />
          <Label>Aggiungi città</Label>
        </Container>
      </TouchableOpacity>
      <AddCityModal isOpen={true} />
    </View>
  );
};
export default AddNewCity;
