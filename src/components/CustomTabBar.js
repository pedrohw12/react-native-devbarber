import React, {useContext} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {UserContext} from '../contexts/UserContext';

const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #4eadbe;
  margin-top: -20px;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <Text style={{color: '#fff', opacity: state.index === 0 ? 1 : 0.5}}>
          Home
        </Text>
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <Text style={{color: '#fff', opacity: state.index === 1 ? 1 : 0.5}}>
          Search
        </Text>
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <Text style={{color: '#4eadbe'}}>Today</Text>
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <Text style={{color: '#fff', opacity: state.index === 3 ? 1 : 0.5}}>
          Fav
        </Text>
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <Text style={{color: '#fff', opacity: state.index === 4 ? 1 : 0.5}}>
            Account
          </Text>
        )}
      </TabItem>
    </TabArea>
  );
};
