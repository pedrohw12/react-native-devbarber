import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Api from '../../Api';

// Images
import FavoriteIcon from '../../assets/heart.png';
import HeartFull from '../../assets/heart-full.png';
import BackIcon from '../../assets/back.png';
import NextIcon from '../../assets/next.png';

// Components
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

// Styles
import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  TestimonialArea,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await Api.getBarber(userInfo.id);
      if (!json.error) {
        setUserInfo(json.data);
        setFavorited(json.data.favorited);
      } else {
        alert('Error: ' + json.error);
      }

      setLoading(false);
    };

    getBarberInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
    Api.setFavorite(userInfo.id);
  };

  const handleServiceChoose = (key) => {
    setSelectedService(key);
    setShowModal(true);
  };

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
            autoplay={true}>
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper></FakeSwiper>
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton onPress={handleFavorite}>
              {favorited ? (
                <Image source={HeartFull} style={{width: 24, height: 24}} />
              ) : (
                <Image source={FavoriteIcon} style={{width: 24, height: 24}} />
              )}
            </UserFavButton>
          </UserInfoArea>
          {loading && <LoadingIcon size="large" color="#000" />}
          <ServiceArea>
            <ServicesTitle>Lista de serviços</ServicesTitle>
            {userInfo.services?.map((item, key) => (
              <ServiceItem key={key}>
                <ServiceInfo>
                  <ServiceName>{item.name}</ServiceName>
                  <ServicePrice>R${item.price.toFixed(2)}</ServicePrice>
                </ServiceInfo>
                <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                  <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                </ServiceChooseButton>
              </ServiceItem>
            ))}
          </ServiceArea>
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons={true}
                prevButton={
                  <Image source={BackIcon} style={{width: 24, height: 24}} />
                }
                nextButton={
                  <Image source={NextIcon} style={{width: 24, height: 24}} />
                }>
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <Image source={BackIcon} style={{width: 24, height: 24}} />
      </BackButton>
      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
};
