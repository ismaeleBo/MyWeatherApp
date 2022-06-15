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

  const screenHeight = Dimensions.get('window').height * 0.7; // TODO: remove fixed valued

  /*
    COSE DA FARE:
    - Splash screen
    - Navigation tabs
    - City screen
    - Store persistente in local storage
    - Localizzazione
  */

  return (
    <Container>
      <HeaderContainer>
        <Title>Good morning!</Title>
        <AddNewCity />
      </HeaderContainer>
      <FlatList
        style={{height: screenHeight}}
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
