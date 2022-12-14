import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addCity } from '../store/slices/favouriteCitiesSlice';
import { fontSizeMedium } from '../assets/fontSize';
import { primaryBlue } from '../assets/colors';
import { fullBorderRadius } from '../assets/borderRadius';
import { spacingXSmall, spacingSmall } from '../assets/spacing';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: ${primaryBlue};
  padding: ${spacingXSmall}px;};
  border-radius: ${fullBorderRadius}px;
  flex: 1;
  margin-left: ${spacingSmall}px;
  min-width: 50px;
`;

const SearchButtonText = styled.Text`
  font-size: ${fontSizeMedium}px;
  text-transform: uppercase;
  font-family: 'Poppins-SemiBold';
  color: white;
  text-align: center;
`;

const CityInput = styled.TextInput`
  flex: 4;
  border-bottom-width: 2px;
  border-color: ${primaryBlue};
  padding: 0;
`;

const SearchCityInput = ({ onSave }) => {
  // TRYME
  // https://github.com/AaronBank/react-native-city-picker

  const dispatch = useDispatch();

  const addFavouriteCity = useCallback(
    (value) => {
      dispatch(addCity(value.city));
      Keyboard.dismiss();
      onSave();
    },
    [dispatch, onSave]
  );

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: { city: '' },
    onSubmit: addFavouriteCity,
  });

  return (
    <Container>
      <CityInput
        value={values.city}
        onChangeText={handleChange('city')}
        placeholder={'Add a new favourite city'}
        maxLength={25}
      />
      <SearchButton onPress={handleSubmit}>
        <SearchButtonText>Add</SearchButtonText>
      </SearchButton>
    </Container>
  );
};

export default SearchCityInput;
