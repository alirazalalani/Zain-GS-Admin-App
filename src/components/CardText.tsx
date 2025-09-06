import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../constants';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const CardText = ({name, value}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: COLOR.PRIMARY_COLOR,
          fontSize: responsiveFontSize(2),
          fontFamily: FONTS.POPPINS_SEMI_BOLD,
        }}>
        {name}:{' '}
      </Text>
      <Text
        style={{
          color: COLOR.SUB_HEADING,
          fontSize: responsiveFontSize(2),
          fontFamily: FONTS.POPPINS_MEDIUM,
        }}>
        {value}
      </Text>
    </View>
  );
};

export default CardText;

const styles = StyleSheet.create({});
