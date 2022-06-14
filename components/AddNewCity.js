import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import plus from '../assets/icons/plus.png';
import cross from '../assets/icons/cross.png';
import {fontSizeXXLarge} from '../assets/fontSize';
import {spacingXSmall, spacingSmall} from '../assets/spacing';
import {primaryBlue} from '../assets/colors';
import SearchCityInput from './SearchCityInput';
import {baseBorderRadius} from '../assets/borderRadius';

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

const CloseButtonIcon = styled.Image`
  width: 34px;
  height: 34px;
`;

const CloseButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${spacingSmall}px;
`;

const CityInputContainer = styled.View`
  border-radius: ${baseBorderRadius}px;
  border: 2px solid ${primaryBlue};
  padding: ${spacingSmall}px;
`;

const AddNewCity = () => {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <View>
      {!isSearching && (
        <TouchableOpacity onPress={() => setIsSearching(true)}>
          <Container>
            <Plus source={plus} />
            <Label>Aggiungi città</Label>
          </Container>
        </TouchableOpacity>
      )}
      {isSearching && (
        <CityInputContainer>
          <CloseButtonContainer>
            <Label>Search a city</Label>
            <TouchableOpacity onPress={() => setIsSearching(false)}>
              <CloseButtonIcon source={cross} />
            </TouchableOpacity>
          </CloseButtonContainer>
          <SearchCityInput />
        </CityInputContainer>
      )}
    </View>
  );
};
export default AddNewCity;
