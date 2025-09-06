import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {Fonts, Images, Colors} from '../../constants';
// import LargeText from '../Texts/LargeText';
// import {horizontalScale, verticalScale} from '../../utils/Dim';

// type ImageProps = {
//   text?: string;
//   image?: ImageSourcePropType | any;
// };
const CartUpperItem = ({Imaged, text}: any) => {
  return (
    <View style={styles.cartContainer}>
      <View style={styles.imageContainer}>
        <Imaged width={responsiveWidth(10)} height={responsiveHeight(5)} />
      </View>

      <Text
        style={{
          color: COLOR.SUB_HEADING,
          fontFamily: FONTS.POPPINS_SEMI_BOLD,
          letterSpacing: 1,
          fontSize: responsiveFontSize(2),
          marginLeft: responsiveWidth(2),
        }}>
        {text}
      </Text>
    </View>
  );
};

export default CartUpperItem;

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
  },
});
