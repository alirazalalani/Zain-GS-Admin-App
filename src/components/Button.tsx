import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../constants';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

interface btnInterface {
  title?: String;
  onPress?: () => void;
  isLoading?: boolean;
  style?: any;
}

const Button = (props: btnInterface) => {
  return (
    <TouchableOpacity
      disabled={props.isLoading}
      onPress={props.onPress}
      activeOpacity={0.5}
      style={{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: props.isLoading ? '#4c5e6e' : COLOR.PRIMARY_COLOR,
        width: '100%',
        paddingVertical: responsiveHeight(1.5),
        borderRadius: responsiveHeight(1.5),

        ...props.style,
      }}>
      {props.isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text
          style={{
            color: 'white',
            textAlign: 'center',

            fontFamily: FONTS.POPPINS_MEDIUM,
            fontSize: responsiveFontSize(2),
          }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
