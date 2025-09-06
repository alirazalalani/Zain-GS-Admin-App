import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLOR, FONTS} from '../constants';

const Heading = ({name, navigation}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../assets/img/back.png')}
          resizeMode="contain"
          style={{
            height: responsiveHeight(4),
            width: responsiveWidth(7),
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: COLOR.SUB_HEADING,
          fontFamily: FONTS.POPPINS_SEMI_BOLD,
          fontSize: responsiveFontSize(2.5),
          textAlign: 'center',
        }}>
        {name}
      </Text>
      <View />
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({});
