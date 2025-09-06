// 667583
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import KeyboardScroll from '../../components/KeyboardScroll';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {apiMiddleware} from '../../utils/HelperFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
import {errorMessage} from '../../utils/ErrorMsg';
const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation: any = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginHandler = async (details: any) => {
    const getFcm: any = await AsyncStorage.getItem('fcmtoken');
    const parsedFcm: any = JSON.parse(getFcm);
    setIsLoading(true);
    // console.log(data);
    const data = {
      email: details.email,
      password: details.password,
      fcmToken: parsedFcm,
    };
    const response = await apiMiddleware({
      url: '/auth/login',
      method: 'post',
      data: data,
      navigation,
    });
    if (response) {
      console.log({response});
      if (response.role !== 'admin') {
        errorMessage('User can not login');
        setIsLoading(false);
        return;
      }
      const stringifyUser: any = JSON.stringify(response);
      await AsyncStorage.setItem('userData', stringifyUser);
      setIsLoading(false);
      navigation.replace('AppStack');
    }
    setIsLoading(false);
  };
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={COLOR.PRIMARY_COLOR}
        barStyle={'light-content'}
      />

      <View style={styles.topSection}>
        {/* <Image
          source={require('../../assets/img/logo12.png')}
          resizeMode="contain"
          style={{
            width: isFocused ? responsiveWidth(70) : responsiveWidth(100),
            height: isFocused ? responsiveHeight(25) : responsiveHeight(40),
            alignSelf: 'center',
          }}
        /> */}
        <IMAGES.Logo
          width={isFocused ? responsiveWidth(35) : responsiveWidth(60)}
          height={isFocused ? responsiveHeight(25) : responsiveHeight(40)}
        />
      </View>
      <Animatable.View animation={'fadeInUpBig'} style={styles.bottomSection}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.LargeTextStyle}>Admin Login</Text>
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    borderColor: '#E2E2E2',
                    paddingHorizontal: responsiveWidth(2),
                    borderWidth: 1,
                    borderRadius: responsiveHeight(1.5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/img/email.png')}
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(6.8),
                      height: responsiveHeight(4),
                    }}
                  />
                  <TextInput
                    placeholder="Enter your Email"
                    placeholderTextColor={COLOR.GREY}
                    value={value}
                    onBlur={() => {
                      setIsFocused(false);
                      onBlur();
                    }}
                    onChangeText={onChange}
                    style={{
                      color: 'black',
                      fontFamily: FONTS.POPPINS_REGULAR,
                      flex: 1,
                      marginLeft: responsiveWidth(2),
                      paddingVertical: responsiveHeight(1),
                      marginTop: responsiveHeight(0.6),
                    }}
                    onFocus={handleFocus}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
            {/* 2nd */}
            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                minLength: 7,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View
                  style={{
                    marginTop: responsiveHeight(2.5),
                    borderColor: '#E2E2E2',
                    paddingHorizontal: responsiveWidth(2),
                    borderWidth: 1,
                    borderRadius: responsiveHeight(1.5),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/img/Lock.png')}
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(6.8),
                      height: responsiveHeight(4),
                    }}
                  />
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={COLOR.GREY}
                    style={{
                      color: 'black',
                      fontFamily: FONTS.POPPINS_REGULAR,
                      flex: 1,
                      marginLeft: responsiveWidth(2),
                      paddingVertical: responsiveHeight(1),
                      marginTop: responsiveHeight(0.6),
                    }}
                    secureTextEntry={!showPass}
                    value={value}
                    onChangeText={onChange}
                    onFocus={handleFocus}
                    onBlur={() => {
                      console.log('hi');
                      setIsFocused(false);

                      onBlur();
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setShowPass(!showPass);
                    }}>
                    {showPass ? (
                      <Image
                        source={require('../../assets/img/Eye_Open.png')}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(6.8),
                          height: responsiveHeight(4),
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/img/Eye_Close.png')}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(6.8),
                          height: responsiveHeight(4),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.error}>
                Password length must be greater than 8
              </Text>
            )}

            <TouchableOpacity>
              <Text
                style={{
                  color: COLOR.DARK_GREY,
                  textAlign: 'right',
                  fontFamily: FONTS.POPPINS_MEDIUM,
                  marginTop: responsiveHeight(1.3),
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Button
              title={'Log In'}
              onPress={handleSubmit(loginHandler)}
              isLoading={isLoading}
              style={{
                marginVertical: responsiveHeight(2.2),
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  error: {
    color: COLOR.ERROR,
    marginTop: responsiveHeight(1.5),
    fontFamily: FONTS.POPPINS_MEDIUM,
    // marginHorizontal: responsiveWidth(5.2),
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_COLOR,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: responsiveWidth(5),
    flex: 1.5,
  },

  LargeTextStyle: {
    textAlign: 'center',
    color: COLOR.PRIMARY_COLOR,
    fontSize: 25,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    marginVertical: 20,
  },
});
