import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLOR, FONTS, IMAGES} from '../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ProfileItem = ({name, Img, onPress}: any) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: responsiveWidth(5.2),
          paddingVertical: responsiveHeight(1.5),
          marginTop: responsiveHeight(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Img width={responsiveWidth(10)} height={responsiveHeight(4.5)} />
          <Text
            style={{
              fontFamily: FONTS.POPPINS_MEDIUM,
              fontSize: responsiveFontSize(2),
              color: 'black',
              paddingTop: responsiveHeight(0.8),
              marginLeft: responsiveWidth(2.8),
            }}>
            {name}
          </Text>
        </View>
        <View>
          {/* <Image
            source={require('../assets/img/right_arrow.png')}
            resizeMode="contain"
            style={{
              width: responsiveWidth(5.5),
              height: responsiveHeight(5),
            }}
          /> */}
          <IMAGES.RightArrow />
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginVertical: responsiveHeight(0.5),
          width: '100%',
          backgroundColor: '#E2E2E2',
          height: 0.8,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({});
