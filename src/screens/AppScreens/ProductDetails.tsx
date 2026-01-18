import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Heading from '../../components/Heading';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiMiddleware, createFormData} from '../../utils/HelperFunction';
import Button from '../../components/Button';
import {successMessage} from '../../utils/ErrorMsg';
import {useSelector} from 'react-redux';
import {selectBasketItemsWithId} from '../../redux/Item/itemSlice';
import {RootState} from '../../redux/store';
import {Avatar} from '@rneui/themed';
import {useForm, Controller} from 'react-hook-form';
import {Content_Type} from '../../utils/Base_Url';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProductDetails = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {id} = route.params;
  console.log(id);
  const [productData, setProductData] = useState<any>({});
  const items: any = useSelector((state: RootState) =>
    selectBasketItemsWithId(state, id),
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      detail: '',
      oldPrice: '',
    },
  });

  const getProductDetail = async () => {
    const response = await apiMiddleware({
      url: `/item/all/${id}`,
      method: 'get',
      navigation,
    });
    if (response) {
      console.log({response});
      setProductData(response);
      reset({
        name: response?.name,
        price: response?.price,
        oldPrice: response?.oldPrice,
        // detail:''
      });
    }
  };

  const handleChangeDetails = async (details: any) => {
    setIsLoading(true);
    console.log({details});
    const data = {
      name: details.name,
      price: details.price,
      oldPrice: details.oldPrice,
    };
    const response = await apiMiddleware({
      url: `/item/update/${id}`,
      method: 'put',
      contentType: Content_Type.FORM_DATA,
      data: createFormData(data),
    });
    if (response) {
      console.log({response});
      setIsLoading(false);
      setEditModal(false);
      successMessage(response.message);
      navigation.goBack();
    }
    setIsLoading(false);
  };
  const deleteItem = async () => {
    setDeleteLoading(true);
    const response = await apiMiddleware({
      url: `/item/delete/${id}`,
      method: 'delete',
    });
    if (response) {
      successMessage(response.message);
      navigation.goBack();
      setDeleteLoading(false);
    }
    setDeleteLoading(false);
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      {productData._id && (
        <>
          <View
            style={{
              backgroundColor: 'white',
              height: responsiveHeight(35),
              borderBottomRightRadius: responsiveHeight(5),
              borderBottomLeftRadius: responsiveHeight(5),
            }}>
            {/* <Heading navigation={navigation} /> */}
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <IMAGES.Test
                height={responsiveHeight(8)}
                width={responsiveWidth(16)}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                source={{uri: productData?.image}}
                resizeMode="cover"
                style={{
                  height: responsiveHeight(27),
                  width: responsiveWidth(60),
                }}
              />
            </View>
          </View>
          <Modal animationType="slide" transparent={true} visible={editModal}>
            <StatusBar backgroundColor={'#606F7E'} barStyle={'dark-content'} />

            <View style={styles.centeredView}>
              <View
                style={[
                  styles.modalView,
                  {paddingHorizontal: 22, height: responsiveHeight(40)},
                ]}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View
                      style={{
                        marginTop: responsiveHeight(1),
                        borderColor: COLOR.GREY,
                        paddingHorizontal: responsiveWidth(2),
                        borderWidth: 1,
                        borderRadius: responsiveHeight(1.5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../assets/img/name.png')}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(6.8),
                          height: responsiveHeight(4),
                        }}
                      />
                      <TextInput
                        placeholder="Enter Item name"
                        placeholderTextColor={COLOR.GREY}
                        value={value}
                        onBlur={() => {
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
                      />
                    </View>
                  )}
                  name="name"
                />
                {errors.name && (
                  <Text style={styles.error}>Item Name is required</Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: 1,
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View
                      style={{
                        marginTop: responsiveHeight(1),
                        borderColor: COLOR.GREY,
                        paddingHorizontal: responsiveWidth(2),
                        borderWidth: 1,
                        borderRadius: responsiveHeight(1.5),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <IMAGES.OLD />
                      <TextInput
                        placeholder="Enter Item's Old Price"
                        placeholderTextColor={COLOR.GREY}
                        value={value}
                        onBlur={() => {
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
                        keyboardType="number-pad"
                      />
                    </View>
                  )}
                  name="oldPrice"
                />
                {errors.oldPrice && (
                  <Text style={styles.error}>oldPrice is required</Text>
                )}
                {/*  */}

                <Controller
                  control={control}
                  rules={{
                    minLength: 1,
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View
                      style={{
                        marginTop: responsiveHeight(1),
                        borderColor: COLOR.GREY,
                        paddingHorizontal: responsiveWidth(2),
                        borderWidth: 1,
                        borderRadius: responsiveHeight(1.5),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <IMAGES.New />
                      <TextInput
                        placeholder="Enter Item Price"
                        placeholderTextColor={COLOR.GREY}
                        value={value}
                        onBlur={() => {
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
                        keyboardType="number-pad"
                      />
                    </View>
                  )}
                  name="price"
                />
                {errors.price && (
                  <Text style={styles.error}>Item Price is required</Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: responsiveHeight(2),
                  }}>
                  <Button
                    title={'Cancel'}
                    style={{
                      width: '40%',
                      margin: 2,
                      backgroundColor: '#AA1E1E',
                    }}
                    onPress={() => {
                      setEditModal(false);
                    }}
                  />
                  <Button
                    title={'Change'}
                    style={{
                      width: '40%',
                      margin: 2,
                    }}
                    isLoading={isLoading}
                    onPress={handleSubmit(handleChangeDetails)}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <Modal animationType="slide" transparent={true} visible={deleteModal}>
            <StatusBar backgroundColor={'#606F7E'} barStyle={'dark-content'} />

            <View style={styles.centeredView}>
              <View
                style={[
                  styles.modalView,
                  {paddingHorizontal: 22, height: responsiveHeight(40)},
                ]}>
                <Avatar
                  size={responsiveHeight(17)}
                  rounded
                  icon={{
                    name: 'question',
                    type: 'font-awesome',
                    color: 'white',
                  }}
                  containerStyle={{
                    backgroundColor: COLOR.PRIMARY_COLOR,
                    borderColor: COLOR.PRIMARY_COLOR,
                    borderWidth: 5,
                  }}></Avatar>

                <Text style={styles.modalText}>
                  Are you sure to you want to Delete this item?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    // position: 'absolute',
                    // bottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    title={'Cancel'}
                    style={{
                      width: '40%',
                      margin: 2,
                      backgroundColor: '#AA1E1E',
                    }}
                    onPress={() => {
                      setDeleteModal(false);
                    }}
                  />
                  <Button
                    title={'Delete'}
                    style={{
                      width: '40%',
                      margin: 2,
                    }}
                    isLoading={deleteLoading}
                    onPress={() => {
                      deleteItem();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(2),
            }}
            style={{
              paddingHorizontal: responsiveWidth(5.2),
            }}>
            <View
              style={{
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontSize: responsiveFontSize(2.5),
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  width: '65%',
                }}>
                {productData?.name}

                <Text
                  style={{
                    color: COLOR.DARK_GREY,
                    fontSize: responsiveFontSize(1.8),
                    fontFamily: FONTS.POPPINS_MEDIUM,
                  }}>
                  {/* add detail of ml kg etc from backend */}
                  {'\n'}
                  {productData?.details}
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setEditModal(true);
                  }}
                  style={{marginHorizontal: responsiveWidth(4)}}>
                  <IMAGES.Pencil
                    height={responsiveHeight(5)}
                    width={responsiveWidth(8)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteModal(true);
                  }}>
                  <IMAGES.Delete
                    height={responsiveHeight(5)}
                    width={responsiveWidth(9)}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: COLOR.SUB_HEADING,
                    fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  }}>
                  RS. {productData?.price} {'   '}
                </Text>
                {+productData.oldPrice > 0 && (
                  <Text
                    style={{
                      fontFamily: FONTS.POPPINS_SEMI_BOLD,
                      color: COLOR.ERROR,
                      fontSize: responsiveFontSize(1.8),
                      textDecorationLine: 'line-through',
                    }}>
                    RS {productData.oldPrice}
                  </Text>
                )}
                {/* <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: COLOR.SUB_HEADING,
                    fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  }}>
                  {'   '} RS. {productData?.price}
                </Text> */}
              </View>
            </View>
            <View
              style={{
                borderBlockColor: COLOR.GREY,
                borderBottomWidth: 0.5,
                marginVertical: responsiveHeight(2),
              }}
            />
            {/* <View> */}
            <Text style={styles.subheading}>Product Detail</Text>
            <Text
              style={{
                color: COLOR.GREY,
                fontSize: responsiveFontSize(1.5),
                fontFamily: FONTS.POPPINS_REGULAR,
              }}>
              {productData?.description}
            </Text>
            {/* </View> */}
            <View
              style={{
                borderBlockColor: COLOR.GREY,
                borderBottomWidth: 0.5,
                marginVertical: responsiveHeight(2),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.subheading}>Review</Text>
              <Image
                source={require('../../assets/img/rating.png')}
                resizeMode="contain"
                style={{
                  width: responsiveWidth(18),
                  height: responsiveHeight(2),
                }}
              />
            </View>

            {items.length > 0 && (
              <Button
                title={'Goto Cart'}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
                style={{width: '100%', marginTop: responsiveHeight(4)}}
              />
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F3F2',
    flex: 1,
  },
  subheading: {
    color: COLOR.SUB_HEADING,
    fontSize: responsiveFontSize(1.8),
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606F7E',
    opacity: 0.9,
  },
  modalView: {
    padding: 30,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '30%',
    opacity: 1,
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLOR.DARK_GREY,
  },
  error: {
    color: COLOR.ERROR,
    marginTop: responsiveHeight(1.5),
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
});
