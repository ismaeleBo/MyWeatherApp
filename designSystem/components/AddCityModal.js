import React from 'react';
import {Modal, Button, Text} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
`;

const AddCityModal = isOpen => {
  // TRYME
  // https://github.com/AaronBank/react-native-city-picker
  return (
    <Modal visible={false}>
      <Container>
        <Text>Calamaro</Text>
        <Button title="Hide modal" onPress={() => null} />
      </Container>
    </Modal>
  );
};

export default AddCityModal;
