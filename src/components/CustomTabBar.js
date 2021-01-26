import React, {useContext} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {UserContext} from '../contexts/UserContext';

// Icons
import Home from '../assets/home.png';
import Search from '../assets/search-black.png';
import Today from '../assets/today.png';
import Heart from '../assets/heart.png';

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

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <Icon source={Home} style={{opacity: state.index === 0 ? 1 : 0.5}} />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <Icon source={Search} style={{opacity: state.index === 1 ? 1 : 0.5}} />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <Icon source={Today} />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <Icon source={Heart} style={{opacity: state.index === 3 ? 1 : 0.5}} />
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
