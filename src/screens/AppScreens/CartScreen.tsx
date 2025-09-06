import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
  addToBasket,
  emptyBasket,
} from '../../redux/Item/itemSlice';
import * as Animatable from 'react-native-animatable';
import {Dropdown} from 'react-native-element-dropdown';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONTS} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import {apiMiddleware} from '../../utils/HelperFunction';
import {errorMessage} from '../../utils/ErrorMsg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const items: any = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [openModal, setOpenModal] = useState(false);
  const [loc, setLoc] = useState<any>([]);
  const [chooseLoc, setChooseLoc] = useState<any>();
  const [trackChange, setTrackChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = async () => {
    const response = await apiMiddleware({
      url: '/location/allLoc',
      method: 'get',
      navigation: navigation,
    });
    if (response) {
      // console.log({response});
      setLoc(response);
    }
  };
  const placeOrder = async () => {
    const getUserData: any = await AsyncStorage.getItem('userData');
    const userData: any = JSON.parse(getUserData);
    if (userData.address == null) {
      console.log('adress');
      return;
    }
    setIsLoading(true);
    if (!chooseLoc?.label) {
      // console.log('object');
      errorMessage('please select your area', 300, 'top');
    }
    const data = {
      delivery_fee: +chooseLoc?.delivery_Fee,
      amount: +basketTotal,
      location_area: chooseLoc?.label,
      orderItems: items,
    };
    // console.log({data});
    const response = await apiMiddleware({
      url: '/order/create',
      method: 'post',
      navigation: navigation,
      data: data,
    });
    if (response) {
      // console.log(response);
      setChooseLoc({});
      setOpenModal(false);
      navigation.navigate('Success');
      setIsLoading(false);
      dispatch(emptyBasket([]));
    }
    setIsLoading(false);
  };

  useMemo(() => {
    const groupedItems = items?.reduce((results: any, item: any) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        backgroundColor={COLOR.BACKGROUND_COLOR}
        barStyle={'dark-content'}
      />

      <View
        style={{
          backgroundColor: 'white',
          elevation: 3,
          paddingTop: responsiveHeight(2),
        }}>
        <Text
          style={{
            color: COLOR.SUB_HEADING,
            fontFamily: FONTS.POPPINS_SEMI_BOLD,
            fontSize: responsiveFontSize(2.5),
            textAlign: 'center',
          }}>
          My Cart
        </Text>
      </View>

      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: items.length > 0 ? responsiveHeight(12) : 0,
          backgroundColor: COLOR.GREY_BACKGROUND,
        }}>
        {Object.entries(groupedItemsInBasket).map(([key, items]: any) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    id: items[0]?.id,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLOR.GREY_BACKGROUND,
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(5.2),
                }}>
                <Image
                  source={{
                    uri: items[0]?.image,
                  }}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveHeight(10),
                  }}
                />
                <View
                  style={{
                    marginLeft: responsiveWidth(6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View style={{width: '74%'}}>
                    <Text
                      style={{
                        color: COLOR.SUB_HEADING,
                        fontFamily: FONTS.POPPINS_SEMI_BOLD,
                        fontSize: responsiveFontSize(1.8),
                      }}>
                      {items[0]?.name}
                      <Text
                        style={{
                          color: COLOR.DARK_GREY,
                          fontSize: responsiveFontSize(1.8),
                          fontFamily: FONTS.POPPINS_MEDIUM,
                        }}>
                        {'\n'}1 kg
                      </Text>
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: responsiveHeight(1),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          dispatch(removeFromBasket({id: key}));
                        }}
                        style={{
                          width: responsiveWidth(8),
                          height: responsiveHeight(4),
                          backgroundColor: COLOR.PRIMARY_COLOR,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: responsiveHeight(2),
                        }}>
                        <Image
                          source={require('../../assets/img/minus.png')}
                          resizeMode="contain"
                          style={{
                            width: responsiveWidth(4),
                            tintColor: 'white',
                          }}
                        />
                      </TouchableOpacity>
                      {/*  */}

                      <View
                        style={{
                          backgroundColor: COLOR.GREY_BACKGROUND,
                          borderRadius: responsiveHeight(2),
                          paddingHorizontal: responsiveWidth(2),
                          paddingVertical: responsiveHeight(1.2),
                          marginHorizontal: responsiveWidth(1),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.2),
                            color: COLOR.SUB_HEADING,
                          }}>
                          {items?.length}
                        </Text>
                      </View>

                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          dispatch(addToBasket(items[0]));
                        }}
                        style={{
                          width: responsiveWidth(8),
                          height: responsiveHeight(4),
                          backgroundColor: COLOR.PRIMARY_COLOR,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: responsiveHeight(2),
                        }}>
                        <Image
                          source={require('../../assets/img/plus.png')}
                          resizeMode="contain"
                          style={{
                            width: responsiveWidth(4),
                            tintColor: 'white',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        color: COLOR.SUB_HEADING,
                        fontSize: responsiveFontSize(2),
                        fontFamily: FONTS.POPPINS_SEMI_BOLD,
                        textAlign: 'right',
                      }}>
                      Rs.{items[0]?.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginVertical: responsiveHeight(0.5),
                  width: '90%',
                  backgroundColor: '#E2E2E2',
                  height: 0.8,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(5.2),
          }}>
          <Text
            style={{
              color: COLOR.PRIMARY_COLOR,
              fontSize: responsiveFontSize(2),
              fontFamily: FONTS.POPPINS_BOLD,
            }}>
            Subtotal
          </Text>
          <Text
            style={{
              color: COLOR.SUB_HEADING,
              fontSize: responsiveFontSize(1.8),
              fontFamily: FONTS.POPPINS_BOLD,
            }}>
            RS. {basketTotal}
          </Text>
        </View>
      </ScrollView>
      {items.length > 0 ? (
        <View
          style={{
            width: '100%',
            marginVertical: responsiveHeight(1.5),
            position: 'absolute',
            bottom: 0,
          }}>
          <Button
            style={{width: '90%'}}
            title={'CheckOut'}
            onPress={() => {
              setOpenModal(true);
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            marginVertical: responsiveHeight(1.5),
            position: 'absolute',
            bottom: 0,
          }}>
          <Button
            style={{width: '90%'}}
            title={'Explore Items'}
            onPress={() => {
              navigation.navigate('Shop');
            }}
          />
        </View>
      )}
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
              height: responsiveHeight(60),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              position: 'absolute',
              bottom: 0,
              borderTopRightRadius: responsiveHeight(4),
              borderTopLeftRadius: responsiveHeight(4),
              paddingHorizontal: responsiveWidth(5.2),
              paddingTop: responsiveHeight(2.5),
            }}
            animation={'fadeInUpBig'}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2.5),
                }}>
                Checkout
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setTrackChange(false);
                  setChooseLoc({});
                  setOpenModal(false);
                }}
                style={{alignSelf: 'flex-end', margin: responsiveHeight(1)}}>
                <Image
                  source={require('../../assets/img/X.png')}
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    tintColor: COLOR.PRIMARY_COLOR,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {/*  */}
            <View
              style={{
                marginTop: responsiveHeight(2),
                width: '150%',
                backgroundColor: '#E2E2E2',
                height: 0.8,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2.5),
              }}>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                Area
              </Text>
              <View
                style={{
                  width: trackChange ? '50%' : '40%',
                }}>
                <Dropdown
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={{
                    backgroundColor: 'white',
                  }}
                  itemTextStyle={{color: COLOR.PRIMARY_COLOR}}
                  iconColor={COLOR.PRIMARY_COLOR}
                  iconStyle={{
                    // width: responsiveWidth(2),
                    height: responsiveHeight(3),
                  }}
                  data={loc}
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={'Select Area'}
                  onChange={(item: any) => {
                    setTrackChange(true);
                    setChooseLoc(item);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(2),
                width: '150%',
                backgroundColor: '#E2E2E2',
                height: 0.8,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
            {/*  */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2.5),
              }}>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                Payment
              </Text>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                Cash on delivery
              </Text>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(2),
                width: '150%',
                backgroundColor: '#E2E2E2',
                height: 0.8,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
            {/*  */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2.5),
              }}>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                Delivery Fee
              </Text>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                {chooseLoc?.delivery_Fee}
              </Text>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(2),
                width: '150%',
                backgroundColor: '#E2E2E2',
                height: 0.8,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />

            {/*  */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2.5),
              }}>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                Grand Total
              </Text>
              <Text
                style={{
                  color: COLOR.SUB_HEADING,
                  fontFamily: FONTS.POPPINS_SEMI_BOLD,
                  fontSize: responsiveFontSize(2),
                }}>
                Rs.
                {+chooseLoc?.delivery_Fee
                  ? basketTotal + +chooseLoc?.delivery_Fee
                  : 0}
              </Text>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(2),
                width: '150%',
                backgroundColor: '#E2E2E2',
                height: 0.8,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
            <Button
              title="Place Order"
              style={{width: '100%', marginTop: responsiveHeight(2)}}
              isLoading={isLoading}
              onPress={() => {
                placeOrder();
              }}
            />
          </Animatable.View>
        </Animatable.View>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  placeholderStyle: {
    color: COLOR.SUB_HEADING,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    fontSize: responsiveFontSize(1.9),
    alignSelf: 'center',
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(2),
    color: COLOR.SUB_HEADING,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
  },
});
