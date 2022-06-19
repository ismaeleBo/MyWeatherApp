import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import CityCard from '../components/CityCard';
import {primaryBlue} from '../assets/colors';
import {fontSizeXXLarge} from '../assets/fontSize';
import {spacingSmall, spacingMedium, spacingXLarge} from '../assets/spacing';
import styled from 'styled-components/native';
import AddNewCity from '../components/AddNewCity';

const Container = styled.View`
  padding-left: ${spacingSmall}px;
  padding-right: ${spacingSmall}px;
  padding-top: ${spacingXLarge}px;
  padding-bottom: ${spacingXLarge}px;
`;

const HeaderContainer = styled.View`
  margin-bottom: ${spacingMedium}px;
`;

const Title = styled.Text`
  color: ${primaryBlue};
  font-size: ${fontSizeXXLarge}px;
  font-family: 'Poppins-Bold';
  text-align: center;
  margin-bottom: ${spacingMedium}px;
`;

const HomeScreen = ({navigation}) => {
  const {value: cities} = useSelector(state => state.favouriteCities);

  const listHeight = Dimensions.get('window').height * 0.7; // TODO: remove fixed valued

  /*
    TODO:
    - Splash screen
    - Navigation tabs
    - City screen
    - Save store in local storage
    - Localization
    - Set current location as favourite city
    - Refactor using TS
  */

  return (
    <Container>
      <HeaderContainer>
        <Title>Good morning!</Title>
        <AddNewCity />
      </HeaderContainer>
      <FlatList
        style={{height: listHeight}}
        data={cities}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({item}) => (
          <CityCard
            city={item.toString()}
            onPress={() => navigation.navigate('City')}
          />
        )}
      />
    </Container>
  );
};

export default HomeScreen;
