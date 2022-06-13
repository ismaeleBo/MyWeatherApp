import React, {useCallback} from 'react';
import {Modal, Button, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {addCity} from '../../store/slices/favouriteCitiesSlice';

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: 20px;
`;

const AddCityModal = isOpen => {
  // TRYME
  // https://github.com/AaronBank/react-native-city-picker

  const dispatch = useDispatch();

  const addFavouriteCity = useCallback(
    value => {
      dispatch(addCity(value.city));
    },
    [dispatch],
  );

  const {handleSubmit, handleChange, values, errors} = useFormik({
    initialValues: {city: ''},
    onSubmit: addFavouriteCity,
  });

  return (
    <Modal visible={false}>
      <Container>
        <TextInput
          value={values.city}
          onChangeText={handleChange('city')}
          placeholder={'Add a new favourite city'}
        />
        <Button title="Add" onPress={handleSubmit} />
      </Container>
    </Modal>
  );
};

export default AddCityModal;
