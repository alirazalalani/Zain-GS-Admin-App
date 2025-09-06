import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const SuccessfullPlace = () => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_COLOR,
        paddingHorizontal: responsiveWidth(5.2),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/img/congo.png')}
          style={{
            width: responsiveWidth(60),
            height: responsiveHeight(30),
            // alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: COLOR.SUB_HEADING,
            fontSize: responsiveFontSize(2.8),
            fontFamily: FONTS.POPPINS_SEMI_BOLD,
            textAlign: 'center',
          }}>
          Your Order has been placed successfully
        </Text>
        <Text
          style={{
            color: '#7C7C7C',
            fontSize: responsiveFontSize(1.5),
            fontFamily: FONTS.POPPINS_REGULAR,
            textAlign: 'center',
            marginTop: responsiveHeight(2),
            marginHorizontal: responsiveWidth(2),
          }}>
          Your items has been placed and is on its's way to beign processed
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: responsiveHeight(4),
        }}>
        <Button
          title={'Track Order'}
          style={{width: '100%'}}
          onPress={() => {
            navigation.replace('MyOrders');
          }}
        />
      </View>
    </View>
  );
};

export default SuccessfullPlace;

const styles = StyleSheet.create({});
