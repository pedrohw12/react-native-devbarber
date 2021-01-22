import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

// Images
import StarFull from '../assets/star-full.png';
import StarHalf from '../assets/star-half.png';
import StarEmpty from '../assets/star-empty.png';

const StarArea = styled.View`
  flex-direction: row;
`;

const StarView = styled.View``;

const StarImg = styled(Image)`
  width: 18px;
  height: 18px;
`;

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

export default ({stars, showNumber}) => {
  let s = [0, 0, 0, 0, 0];
  let floor = Math.floor(stars);
  let left = stars - floor;

  for (var i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if (left > 0) {
    s[i] = 1;
  }

  return (
    <StarArea>
      {s.map((i, key) => (
        <StarView key={key}>
          {i === 0 && <StarImg source={StarEmpty} />}
          {i === 1 && <StarImg source={StarHalf} />}
          {i === 2 && <StarImg source={StarFull} />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
};
