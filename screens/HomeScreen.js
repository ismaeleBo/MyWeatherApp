import React from 'react';
import {FlatList} from 'react-native';
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

  /*
    COSE DA FARE:
    - Sistemare flatlist
    - Eliminare città da preferiti
    - Splash screen
    - Navigation tabs
    - City screen
    - Store persistente in local storage
    - Colori delle cards in base alle condizioni
    - Localizzazione
  */

  return (
    <Container>
      <HeaderContainer>
        <Title>Good morning!</Title>
        <AddNewCity />
      </HeaderContainer>
      <FlatList
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
