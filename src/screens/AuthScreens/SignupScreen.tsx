import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
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
import {COLOR, FONTS} from '../../constants';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {apiMiddleware} from '../../utils/HelperFunction';
import * as Animatable from 'react-native-animatable';
import {Platform} from 'react-native';

const SignupScreen = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [checkNum, setCheckNum] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const navigation: any = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      mobile: '',
      password: '',
    },
  });
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const SignupHandler = async (details: any) => {
    setIsLoading(true);
    console.log('hiii');
    const data = {
      username: details.username,
      email: details.email,
      mobile: details.mobile,
      password: details.password,
      role: 'user',
    };

    const response = await apiMiddleware({
      url: '/auth/register',
      method: 'post',
      data: data,
      navigation,
    });
    if (response) {
      console.log(response);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    // <KeyboardScroll>
    //   <StatusBar
    //     translucent={true}
    //     backgroundColor={'transparent'}
    //     barStyle={'dark-content'}
    //   />

    //   <ImageBackground
    //     source={require('../../assets/img/bg.png')}
    //     style={{
    //       height: responsiveHeight(25),
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}>
    //     <Image
    //       source={require('../../assets/img/logo.png')}
    //       resizeMode="contain"
    //       style={{
    //         // position: 'absolute',
    //         width: responsiveWidth(30),
    //         height: responsiveHeight(18),
    //         // alignSelf: 'center',
    //       }}
    //     />
    //   </ImageBackground>

    //   <View
    //     style={{
    //       paddingHorizontal: responsiveWidth(5.2),
    //       marginTop: responsiveHeight(1),
    //     }}>
    //     <Text
    //       style={{
    //         fontSize: responsiveFontSize(3),
    //         fontFamily: FONTS.POPPINS_SEMI_BOLD,
    //         color: COLOR.SUB_HEADING,
    //       }}>
    //       Sign Up
    //     </Text>
    //     <Text
    //       style={{
    //         fontSize: responsiveFontSize(1.7),
    //         fontFamily: FONTS.POPPINS_MEDIUM,
    //         color: COLOR.DARK_GREY,
    //       }}>
    //       Enter your details below
    //     </Text>
    //   </View>
    //   <Controller
    //     control={control}
    //     render={({field: {onChange, onBlur, value}}) => (
    //       <View
    //         style={{
    //           marginTop: responsiveHeight(3),
    //           borderColor: '#E2E2E2',
    //           borderBottomWidth: 1,
    //           marginHorizontal: responsiveWidth(5),
    //         }}>
    //         <Text
    //           style={{
    //             color: COLOR.SUB_HEADING,
    //             fontSize: responsiveFontSize(1.8),
    //             fontFamily: FONTS.POPPINS_MEDIUM,
    //           }}>
    //           Name
    //         </Text>
    //         <TextInput
    //           placeholder="Enter your fullname"
    //           placeholderTextColor={COLOR.GREY}
    //           style={{
    //             color: 'black',
    //             fontFamily: FONTS.POPPINS_REGULAR,
    //           }}
    //           value={value}
    //           onBlur={onBlur}
    //           onChangeText={txt => {
    //             onChange(txt);
    //           }}
    //         />
    //       </View>
    //     )}
    //     name="username"
    //     rules={{
    //       required: 'username is required',
    //     }}
    //     defaultValue=""
    //   />
    //   {errors.username && (
    //     <Text style={styles.error}>user name is required</Text>
    //   )}

    //   {/*  */}
    //   <Controller
    //     control={control}
    //     render={({field: {onChange, onBlur, value}}) => (
    //       <View
    //         style={{
    //           marginTop: responsiveHeight(3),
    //           borderColor: '#E2E2E2',
    //           borderBottomWidth: 1,
    //           marginHorizontal: responsiveWidth(5),
    //         }}>
    //         <Text
    //           style={{
    //             color: COLOR.SUB_HEADING,
    //             fontSize: responsiveFontSize(1.8),
    //             fontFamily: FONTS.POPPINS_MEDIUM,
    //           }}>
    //           Email
    //         </Text>
    //         <View style={styles.basic}>
    //           <TextInput
    //             placeholder="Enter your Email"
    //             placeholderTextColor={COLOR.GREY}
    //             style={{
    //               color: 'black',
    //               fontFamily: FONTS.POPPINS_REGULAR,
    //               flex: 1,
    //             }}
    //             value={value}
    //             onBlur={onBlur}
    //             onChangeText={txt => {
    //               console.log(txt);
    //               setCheckEmail(false);

    //               if (emailRegex.test(txt)) {
    //                 console.log('matched');
    //                 setCheckEmail(true);
    //               }
    //               onChange(txt);
    //             }}
    //           />
    //           {checkEmail && (
    //             <Image
    //               source={require('../../assets/img/tick.png')}
    //               resizeMode="contain"
    //               style={{
    //                 width: responsiveWidth(5),
    //                 height: responsiveHeight(5),
    //                 marginRight: responsiveWidth(2),
    //               }}
    //             />
    //           )}
    //         </View>
    //       </View>
    //     )}
    //     name="email"
    //     rules={{
    //       required: 'Email is required',
    //       pattern: {
    //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //         message: 'Invalid email address',
    //       },
    //     }}
    //     defaultValue=""
    //   />
    //   {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
    //   {/*  */}
    //   <Controller
    //     control={control}
    //     render={({field: {onChange, onBlur, value}}) => (
    //       <View
    //         style={{
    //           marginTop: responsiveHeight(3),
    //           borderColor: '#E2E2E2',
    //           borderBottomWidth: 1,
    //           marginHorizontal: responsiveWidth(5),
    //         }}>
    //         <Text
    //           style={{
    //             color: COLOR.SUB_HEADING,
    //             fontSize: responsiveFontSize(1.8),
    //             fontFamily: FONTS.POPPINS_MEDIUM,
    //           }}>
    //           Mobile No
    //         </Text>
    //         <View style={styles.basic}>
    //           <TextInput
    //             placeholder="Enter your mobile no"
    //             placeholderTextColor={COLOR.GREY}
    //             style={{
    //               color: 'black',
    //               fontFamily: FONTS.POPPINS_REGULAR,
    //               flex: 1,
    //             }}
    //             value={value}
    //             onBlur={onBlur}
    //             onChangeText={txt => {
    //               console.log(txt.length);
    //               if (txt.length === 11) {
    //                 setCheckNum(true);
    //               }

    //               onChange(txt);
    //             }}
    //           />
    //           {checkNum && (
    //             <Image
    //               source={require('../../assets/img/tick.png')}
    //               resizeMode="contain"
    //               style={{
    //                 width: responsiveWidth(5),
    //                 height: responsiveHeight(5),
    //                 marginRight: responsiveWidth(2),
    //               }}
    //             />
    //           )}
    //         </View>
    //       </View>
    //     )}
    //     name="mobile"
    //     rules={{
    //       required: 'Mobile No is required',
    //       minLength: 11,
    //       maxLength: 11,
    //     }}
    //     defaultValue=""
    //   />
    //   {errors.mobile && (
    //     <Text style={styles.error}>mobile no must be equal to 11 digits</Text>
    //   )}
    //   {/*  */}
    //   <Controller
    //     control={control}
    //     rules={{
    //       required: 'Password is required',
    //       minLength: 7,
    //     }}
    //     render={({field: {onChange, onBlur, value}}) => (
    //       <View
    //         style={{
    //           marginTop: responsiveHeight(3),
    //           borderColor: '#E2E2E2',
    //           borderBottomWidth: 1,
    //           marginHorizontal: responsiveWidth(5),
    //         }}>
    //         <Text
    //           style={{
    //             color: COLOR.SUB_HEADING,
    //             fontSize: responsiveFontSize(1.8),
    //             fontFamily: FONTS.POPPINS_MEDIUM,
    //           }}>
    //           Password
    //         </Text>
    //         <View style={styles.basic}>
    //           <TextInput
    //             placeholder="Enter your password"
    //             placeholderTextColor={COLOR.GREY}
    //             style={{
    //               color: 'black',
    //               fontFamily: FONTS.POPPINS_REGULAR,
    //               flex: 1,
    //             }}
    //             secureTextEntry={true}
    //             value={value}
    //             onChangeText={txt => {
    //               if (txt.length >= 8) {
    //                 setCheckPass(true);
    //               }
    //               onChange(txt);
    //             }}
    //             onBlur={onBlur}
    //           />
    //           {checkPass && (
    //             <Image
    //               source={require('../../assets/img/tick.png')}
    //               resizeMode="contain"
    //               style={{
    //                 width: responsiveWidth(5),
    //                 height: responsiveHeight(5),
    //                 marginRight: responsiveWidth(2),
    //               }}
    //             />
    //           )}
    //         </View>
    //       </View>
    //     )}
    //     name="password"
    //   />
    //   {errors.password && (
    //     <Text style={styles.error}>Password length must be greater than 8</Text>
    //   )}

    //   <Button title={'Sign Up'} onPress={handleSubmit(SignupHandler)} />
    //   <View
    //     style={{
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       flexDirection: 'row',
    //       height: 60,
    //     }}>
    //     <Text
    //       style={{
    //         color: COLOR.DARK_GREY,
    //         letterSpacing: 0.3,
    //         fontFamily: FONTS.POPPINS_MEDIUM,
    //       }}>
    //       Already have an account?
    //     </Text>
    //     <TouchableOpacity
    //       onPress={() => {
    //         navigation.navigate('Login');
    //       }}>
    //       <Text
    //         style={{
    //           color: COLOR.PRIMARY_COLOR,
    //           letterSpacing: 0.3,
    //           fontFamily: FONTS.POPPINS_MEDIUM,
    //           marginLeft: 2,
    //         }}>
    //         Sign In
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardScroll>
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
        <Image
          source={require('../../assets/img/logo12.png')}
          resizeMode="contain"
          style={{
            width: isFocused ? responsiveWidth(50) : responsiveWidth(70),
            height: isFocused ? responsiveHeight(20) : responsiveHeight(30),
            alignSelf: 'center',
          }}
        />
      </View>
      <Animatable.View animation={'fadeInUpBig'} style={styles.bottomSection}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.LargeTextStyle}>Signup</Text>
            <Controller
              control={control}
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
                  }}>
                  <Image
                    source={require('../../assets/img/user.png')}
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(6.8),
                      height: responsiveHeight(4),
                    }}
                  />
                  <TextInput
                    placeholder="Enter your fullname"
                    placeholderTextColor={COLOR.GREY}
                    style={{
                      color: 'black',
                      fontFamily: FONTS.POPPINS_REGULAR,
                      flex: 1,
                      marginLeft: responsiveWidth(2),
                      paddingVertical: responsiveHeight(1),
                      marginTop: responsiveHeight(0.6),
                    }}
                    value={value}
                    onBlur={() => {
                      setIsFocused(false);
                      onBlur();
                    }}
                    onFocus={handleFocus}
                    onChangeText={txt => {
                      onChange(txt);
                    }}
                  />
                </View>
              )}
              name="username"
              rules={{
                required: 'username is required',
              }}
              defaultValue=""
            />
            {errors.username && (
              <Text style={styles.error}>user name is required</Text>
            )}

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
                    marginTop: responsiveHeight(2.5),
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
                  <View style={styles.basic}>
                    <TextInput
                      placeholder="Enter your Email"
                      placeholderTextColor={COLOR.GREY}
                      value={value}
                      onBlur={a => {
                        console.log(a);
                        setIsFocused(false);
                        onBlur();
                      }}
                      onChangeText={txt => {
                        setCheckEmail(false);

                        if (emailRegex.test(txt)) {
                          setCheckEmail(true);
                        }
                        onChange(txt);
                      }}
                      style={{
                        color: 'black',
                        fontFamily: FONTS.POPPINS_REGULAR,
                        flex: 1,
                        paddingVertical: responsiveHeight(1),
                        marginTop: responsiveHeight(0.6),
                      }}
                      onFocus={handleFocus}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {checkEmail && (
                      <Image
                        source={require('../../assets/img/tick.png')}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(5),
                          height: responsiveHeight(5),
                          marginRight: responsiveWidth(6),
                        }}
                      />
                    )}
                  </View>
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
            <Controller
              control={control}
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
                    source={require('../../assets/img/phone.png')}
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(6.8),
                      height: responsiveHeight(4),
                    }}
                  />
                  <View style={styles.basic}>
                    <TextInput
                      placeholder="Enter your mobile no"
                      placeholderTextColor={COLOR.GREY}
                      style={{
                        color: 'black',
                        fontFamily: FONTS.POPPINS_REGULAR,
                        flex: 1,

                        paddingVertical: responsiveHeight(1),
                        marginTop: responsiveHeight(0.6),
                      }}
                      value={value}
                      onBlur={a => {
                        console.log(a);
                        setIsFocused(false);
                        onBlur();
                      }}
                      onFocus={handleFocus}
                      onChangeText={txt => {
                        if (txt.length === 11) {
                          setCheckNum(true);
                        } else {
                          setCheckNum(false);
                        }

                        onChange(txt);
                      }}
                    />
                    {checkNum && (
                      <Image
                        source={require('../../assets/img/tick.png')}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(5),
                          height: responsiveHeight(5),
                          marginRight: responsiveWidth(6),
                        }}
                      />
                    )}
                  </View>
                </View>
              )}
              name="mobile"
              rules={{
                required: 'Mobile No is required',
                minLength: 11,
                maxLength: 11,
              }}
              defaultValue=""
            />
            {errors.mobile && (
              <Text style={styles.error}>
                mobile no must be equal to 11 digits
              </Text>
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
                  <View style={styles.basic}>
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor={COLOR.GREY}
                      style={{
                        color: 'black',
                        fontFamily: FONTS.POPPINS_REGULAR,
                        flex: 1,
                        paddingVertical: responsiveHeight(1),
                        marginTop: responsiveHeight(0.6),
                      }}
                      secureTextEntry={true}
                      value={value}
                      onChangeText={txt => {
                        if (txt.length >= 8) {
                          setCheckPass(true);
                        }
                        onChange(txt);
                      }}
                      onFocus={handleFocus}
                      onBlur={() => {
                        console.log('hi');
                        setIsFocused(false);

                        onBlur();
                      }}
                    />
                    {checkPass && (
                      <Image
                        source={require('../../assets/img/tick.png')}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(5),
                          height: responsiveHeight(5),
                          marginRight: responsiveWidth(6),
                        }}
                      />
                    )}
                  </View>
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
              title={'Sign Up'}
              onPress={handleSubmit(SignupHandler)}
              isLoading={isLoading}
              style={{
                marginVertical: responsiveHeight(2.2),
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: 60,
              }}>
              <Text
                style={{
                  color: COLOR.DARK_GREY,
                  letterSpacing: 0.3,
                  fontFamily: FONTS.POPPINS_MEDIUM,
                }}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    color: COLOR.PRIMARY_COLOR,
                    letterSpacing: 0.3,
                    fontFamily: FONTS.POPPINS_MEDIUM,
                    marginLeft: 2,
                  }}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  // error: {
  //   color: COLOR.ERROR,
  //   marginTop: responsiveHeight(1.5),
  //   fontFamily: FONTS.POPPINS_MEDIUM,
  //   marginHorizontal: responsiveWidth(5.2),
  // },
  basic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
  },
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
    flex: 2.8,
  },

  LargeTextStyle: {
    textAlign: 'center',
    color: COLOR.PRIMARY_COLOR,
    fontSize: 25,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    marginVertical: 20,
  },
});
