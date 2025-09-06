import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfileItem from '../../components/ProfileItem';
import {Avatar} from '@rneui/themed';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {apiMiddleware} from '../../utils/HelperFunction';

const ProfileScreen = () => {
  const [user, setUser] = useState<any>({});

  const getProfile = async () => {
    const getItems: any = await AsyncStorage.getItem('userData');
    const parsedItem: any = await JSON.parse(getItems);

    setUser(parsedItem);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []),
  );
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLOR.PRIMARY_COLOR}
        barStyle={'light-content'}
      />
      <View
        style={{
          paddingHorizontal: responsiveWidth(5.2),
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(40),
          backgroundColor: COLOR.PRIMARY_COLOR,
        }}>
        <Avatar
          size={responsiveHeight(20)}
          rounded
          source={{
            uri: user.image
              ? user.image
              : 'https://randomuser.me/api/portraits/men/36.jpg',
          }}
        />
        <View
          style={{justifyContent: 'center', marginTop: responsiveHeight(1.5)}}>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(2.2),
              fontFamily: FONTS.POPPINS_SEMI_BOLD,
              letterSpacing: 0.5,
              textAlign: 'center',
            }}>
            {user?.username}
            {'\n'}
            <Text
              style={{
                color: COLOR.GREY,
                fontSize: responsiveFontSize(1.8),
                fontFamily: FONTS.POPPINS_LIGHT,
                letterSpacing: 0.5,
                textAlign: 'center',
              }}>
              {user?.email}
            </Text>
          </Text>
        </View>
      </View>

      {/* <ProfileItem
        name={'Orders'}
        Img={IMAGES.Orders}
        onPress={() => {
          navigation.navigate('MyOrders');
        }}
      />
      <ProfileItem
        name={'My Details'}
        onPress={() => {
          navigation.navigate('UserDetails');
        }}
        Img={IMAGES.MyDetails}
      /> */}

      {/* <ProfileItem
        name={'Notification'}
        // img={require('../../assets/img/notification.png')}
      /> */}
      {/* <ProfileItem name={'Help'} Img={IMAGES.Help} />
      <ProfileItem name={'About'} Img={IMAGES.About} /> */}
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          marginBottom: responsiveHeight(2),
        }}>
        <Button
          title={'Log Out'}
          isLoading={isLoading}
          style={{
            width: '90%',
          }}
          onPress={async () => {
            setIsLoading(true);
            await AsyncStorage.removeItem('userData');
            navigation.replace('Stack');
            setIsLoading(false);
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_COLOR,
  },
});
