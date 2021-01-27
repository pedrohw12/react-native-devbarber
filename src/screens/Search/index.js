import React, {useState} from 'react';

import Api from '../../Api';

// Components
import BarberItem from '../../components/BarberItem';

// Styles
import {
  Container,
  SearchArea,
  SearchInput,
  Scroller,
  LoadingIcon,
  ListArea,
  EmptyWarning,
} from './styles';

export default () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [list, setList] = useState([]);

  const searchBarbers = async () => {
    setEmptyList(false);
    setLoading(true);
    setList([]);

    if (searchText) {
      let res = await Api.search(searchText);
      if (!res.error) {
        if (res.list.length > 0) {
          setList(res.list);
        } else {
          setEmptyList(true);
        }
      } else {
        alert('Error: ' + res.error);
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <SearchArea>
        <SearchInput
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          onEndEditing={searchBarbers}
          returnKeyType="search"
          autoFocus={true}
          selectTextOnFocus={true}
        />
      </SearchArea>
      <Scroller>
        {loading && <LoadingIcon size="large" color="#000" />}
        {emptyList && (
          <EmptyWarning>
            Não achamos barbeiros com o nome '{searchText}'
          </EmptyWarning>
        )}
        <ListArea>
          {list.map((item, key) => (
            <BarberItem key={key} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
