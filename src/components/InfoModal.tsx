import {
    StyleSheet,
    Text,
    View,
    Modal,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
  import React, {useContext} from 'react';
  import {COLOR, FONTS} from '../constants';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
  } from 'react-native-responsive-dimensions';
  import Button from './Button';
  //   import {Color, Fonts, Images} from '../constant';
  
  //   import {horizontalScale, verticalScale} from '../utilities/Dimensions';
  
  const InfoModal = ({message, Photo, btnText, onPress}: any) => {
    return (
      <Modal animationType="slide" transparent={true} visible={true}>
        <StatusBar backgroundColor={'#606F7E'} />
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                paddingHorizontal: 22,
                paddingVertical: 20,
              },
            ]}>
            <Photo height={responsiveHeight(30)} width={responsiveHeight(35)} />
            <Text style={styles.title}>{message}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Button
                title={btnText}
                style={{marginTop: responsiveHeight(1.5)}}
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  export default InfoModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#606F7E',
      opacity: 0.9,
    },
    modalView: {
      // paddingVertical: verticalScale(5),
      backgroundColor: 'white',
      borderRadius: responsiveFontSize(2.5),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
      width: '90%',
      // height: '100%',
    },
  
    title: {
      fontSize: responsiveFontSize(2),
      color: 'red',
      marginTop: responsiveHeight(1.8),
  
      textAlign: 'center',
      fontFamily: FONTS.POPPINS_SEMI_BOLD,
    },
  });
  