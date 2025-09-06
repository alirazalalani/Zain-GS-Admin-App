import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect} from 'react';
import {COLOR, FONTS, IMAGES} from '../../constants';
import Heading from '../../components/Heading';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useForm, Controller} from 'react-hook-form';
import {apiMiddleware, createFormData} from '../../utils/HelperFunction';
import Button from '../../components/Button';
import KeyboardScroll from '../../components/KeyboardScroll';
import {Content_Type} from '../../utils/Base_Url';
import {successMessage} from '../../utils/ErrorMsg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
const UserDetailsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkNum, setCheckNum] = useState(false);
  const [user, setUser] = useState<any>({});
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState(
    'https://randomuser.me/api/portraits/men/36.jpg',
  );
  const navigation: any = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      mobile: '',
      address: '',
    },
  });
  const getProfile = async () => {
    const getItems: any = await AsyncStorage.getItem('userData');
    const parsedItem: any = await JSON.parse(getItems);
    setImages(parsedItem.image === null ? images : parsedItem.image);

    // console.log({parsedItem});
    const response = await apiMiddleware({
      url: '/user/profile',
      method: 'get',
      navigation,
    });
    if (response) {
      setUser(response);
      reset({
        username: response?.username,
        email: response?.email,
        mobile: response?.mobile,
        address: response.address,
      });
    }
  };

  const updateProfile = async (details: any) => {
    setIsLoading(true);
    // console.log({details});
    const data = {
      username: details?.username,
      mobile: details?.mobile,
      address: details?.address,
    };
    const response = await apiMiddleware({
      url: '/user/update',
      method: 'put',
      contentType: Content_Type.FORM_DATA,
      data: createFormData(data),
      navigation,
    });
    if (response) {
      // console.log({response});
      const getItems: any = await AsyncStorage.getItem('userData');
      const parsedItem: any = await JSON.parse(getItems);
      parsedItem.username = details?.username;
      parsedItem.address = details?.address;
      parsedItem.mobile = details?.mobile;
      successMessage(response.message);
      setIsLoading(false);
      setShow(false);
      const stringifyResponse = await JSON.stringify(parsedItem);
      await AsyncStorage.setItem('userData', stringifyResponse);
    }
    setIsLoading(false);
  };
  const SelectImageFromGallery = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async (image: any) => {
      // console.log(image);
      setOpenModal(false);
      await setImage(image);
    });
  };

  const selectImgeFromCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async (image: any) => {
      // console.log(image);
      setOpenModal(false);
      await setImage(image);
    });
  };

  const setImage = async (img: any) => {
    const data = {
      image: {
        uri: (img as any).path,
        name: (img as any).path?.split('/')[
          (img as any).path?.split('/')?.length - 1
        ],
        fileName: (img as any)?.path.split('/')[
          (img as any)?.path.split('/')?.length - 1
        ],
        type: (img as any).mime,
      },
    };
    const response = await apiMiddleware({
      url: '/user/update',
      method: 'put',
      data: createFormData(data),
      contentType: Content_Type.FORM_DATA,
      navigation,
    });

    if (response) {
      // console.log({response});
      setImages(data.image.uri);
      const getItems: any = await AsyncStorage.getItem('userData');
      const parsedItem = await JSON.parse(getItems);
      parsedItem.image = data.image.uri;
      const stringifyResponse = await JSON.stringify(parsedItem);
      await AsyncStorage.setItem('userData', stringifyResponse);
      successMessage(response.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLOR.BACKGROUND_COLOR}
        barStyle={'dark-content'}
      />
      {/* <Heading name={'My Details'} navigation={navigation} /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLOR.BACKGROUND_COLOR,
          paddingRight: responsiveWidth(5),
          elevation: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <IMAGES.Test
              height={responsiveHeight(6.5)}
              width={responsiveWidth(17)}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLOR.SUB_HEADING,
              fontFamily: FONTS.POPPINS_SEMI_BOLD,
              fontSize: responsiveFontSize(2),
              textAlign: 'center',
              paddingTop: responsiveHeight(0.4),
              // paddingHorizontal: responsiveWidth(5),
            }}>
            My Profile
          </Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          {items.length > 0 && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLOR.PRIMARY_COLOR,
                borderRadius: responsiveHeight(50),
                height: responsiveHeight(2.5),
                width: responsiveHeight(2.5),
                justifyContent: 'center',
                zIndex: 1,
                top: 0,
                right: -8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: responsiveFontSize(1.5),
                  color: 'white',
                }}>
                {items.length}
              </Text>
            </View>
          )}

          <IMAGES.CartFocused />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(5.2),
        }}>
        <View style={{alignSelf: 'center', marginTop: responsiveHeight(3)}}>
          <Avatar size={responsiveHeight(15)} rounded source={{uri: images}}>
            <Avatar.Accessory
              color={COLOR.PRIMARY_COLOR}
              size={25}
              onPress={() => {
                setOpenModal(true);
              }}
            />
          </Avatar>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                marginTop: responsiveHeight(3),
                borderColor: '#E2E2E2',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: FONTS.POPPINS_MEDIUM,
                }}>
                Name
              </Text>
              <TextInput
                placeholder={'Enter your fullname'}
                placeholderTextColor={COLOR.GREY}
                style={{
                  color: 'black',
                  fontFamily: FONTS.POPPINS_REGULAR,
                }}
                value={value}
                onBlur={onBlur}
                onChangeText={txt => {
                  setShow(true);
                  onChange(txt);
                }}
              />
            </View>
          )}
          name="username"
          rules={{
            required: 'username is required',
          }}
          defaultValue={user?.username}
        />
        {errors.username && (
          <Text style={styles.error}>user name is required</Text>
        )}

        {/*  */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                marginTop: responsiveHeight(3),
                borderColor: '#E2E2E2',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: FONTS.POPPINS_MEDIUM,
                }}>
                Email{' '}
                <Text
                  style={{
                    color: COLOR.GREY,
                    fontSize: responsiveFontSize(1.8),
                    fontFamily: FONTS.POPPINS_LIGHT,
                  }}>
                  (Can't be edit)
                </Text>
              </Text>
              <View style={styles.basic}>
                <TextInput
                  placeholder="Enter your Email"
                  placeholderTextColor={COLOR.GREY}
                  style={{
                    color: 'black',
                    fontFamily: FONTS.POPPINS_REGULAR,
                    flex: 1,
                  }}
                  value={value}
                  onBlur={onBlur}
                  editable={false}
                  onChangeText={txt => {
                    onChange(txt);
                  }}
                />
              </View>
            </View>
          )}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        {/*  */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                marginTop: responsiveHeight(3),
                borderColor: '#E2E2E2',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: FONTS.POPPINS_MEDIUM,
                }}>
                Mobile No
              </Text>
              <View style={styles.basic}>
                <TextInput
                  placeholder="Enter your mobile no"
                  placeholderTextColor={COLOR.GREY}
                  style={{
                    color: 'black',
                    fontFamily: FONTS.POPPINS_REGULAR,
                    flex: 1,
                  }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={txt => {
                    // console.log(txt.length);
                    if (txt.length === 11) {
                      setShow(true);

                      setCheckNum(true);
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
                      marginRight: responsiveWidth(2),
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
          <Text style={styles.error}>mobile no must be equal to 11 digits</Text>
        )}
        {/*  */}
        <Controller
          control={control}
          rules={{
            required: 'Address is required',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                marginTop: responsiveHeight(3),
                borderColor: '#E2E2E2',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: FONTS.POPPINS_MEDIUM,
                }}>
                Address
              </Text>
              <View style={styles.basic}>
                <TextInput
                  placeholder="Enter your Address"
                  placeholderTextColor={COLOR.GREY}
                  style={{
                    color: 'black',
                    fontFamily: FONTS.POPPINS_REGULAR,
                    flex: 1,
                  }}
                  value={value}
                  onChangeText={txt => {
                    setShow(true);

                    onChange(txt);
                  }}
                  onBlur={onBlur}
                />
              </View>
            </View>
          )}
          name="address"
        />
        {errors.address && (
          <Text style={styles.error}>Address is required</Text>
        )}
        {show && (
          <Button
            title={'Update'}
            onPress={handleSubmit(updateProfile)}
            isLoading={isLoading}
          />
        )}
      </ScrollView>
      <Modal
        visible={openModal}
        style={{
          flex: 1,
        }}
        transparent>
        <Animatable.View
          duration={100}
          animation={'bounceInUp'}
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.50)',
          }}>
          <Animatable.View
            duration={600}
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: responsiveHeight(22),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              position: 'absolute',
              bottom: 0,
              borderTopRightRadius: responsiveHeight(3),
              borderTopLeftRadius: responsiveHeight(3),
            }}
            animation={'fadeInUpBig'}>
            <TouchableOpacity
              onPress={() => {
                setOpenModal(false);
              }}
              style={{alignSelf: 'flex-end', margin: responsiveHeight(1)}}>
              <Image
                source={require('../../assets/img/X.png')}
                style={{
                  width: responsiveWidth(7),
                  height: responsiveHeight(4),
                  tintColor: COLOR.PRIMARY_COLOR,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  SelectImageFromGallery();
                }}>
                <Image
                  source={require('../../assets/img/Upload.png')}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(13),
                    tintColor: COLOR.PRIMARY_COLOR,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  selectImgeFromCamera();
                }}>
                <Image
                  source={require('../../assets/img/Take.png')}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(13),
                    tintColor: COLOR.PRIMARY_COLOR,
                  }}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </Animatable.View>
      </Modal>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_COLOR,
  },
  error: {
    color: COLOR.ERROR,
    marginTop: responsiveHeight(1.5),
    fontFamily: FONTS.POPPINS_MEDIUM,
    // marginHorizontal: responsiveWidth(5.2),
  },
  basic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
