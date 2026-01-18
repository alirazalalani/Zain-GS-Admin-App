import {
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {COLOR, FONTS, IMAGES} from '../../constants';
import CartUpperItem from '../../components/CartUpperItem';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiMiddleware, setColor} from '../../utils/HelperFunction';
import Button from '../../components/Button';
import {Avatar} from '@rneui/base';
import {OrderStatus} from '../../constants/ENUMS';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const OrderDetails = () => {
  const route: any = useRoute();
  const insets = useSafeAreaInsets();
  const [pickup, setPickup] = useState(false);
  const [reject, setReject] = useState(false);

  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    address,
    items,
    name,
    phone,
    date,
    orderId,
    status,
    total,
    dc,
    area,
    orderType,
  } = route.params;
  const parts = orderId.split('-');
  const formattedId = parts[0] + '.....' + parts[parts.length - 1];

  // console.log({para: route.params.items});
  const {col, bg} = setColor(status);

  const acceptOrder = async (status: any) => {
    setIsLoading(true);
    const data = {
      status: status,
    };
    const response = await apiMiddleware({
      url: `/order/update/${orderId}`,
      method: 'put',
      data: data,
      navigation: navigation,
    });
    if (response) {
      setIsLoading(false);
      setPickup(false);
      setReject(false);
      if (status === OrderStatus.ACTIVE) {
        navigation.navigate('Active');
      } else {
        navigation.navigate('Completed');
      }
    }
    setPickup(false);
    setReject(false);
  };

  const makeWhatsAppLink = number => {
    // Remove any non-digit characters just in case
    number = number.replace(/\D/g, '');

    // If number starts with "0", replace it with "92"
    if (number.startsWith('0')) {
      number = '92' + number.slice(1);
    }

    // items.map(item => {
    //   console.log({item});
    // });
    // let message = {
    //   amount: total,
    //   name: ['name', 'ali', 'ok'],
    // };
    // message = JSON.stringify(message);

    console.log(number, 'number');
    const encodedMessage = encodeURIComponent(
      // message,

      `Dear customer, thanks for choosing Zain General Store.  
Is your order confirmed for the amount of ${
        total + dc
      }? Or do you want anything more to order?

معزز گاہک، زین جنرل اسٹور کو منتخب کرنے کا شکریہ۔  
کیا آپ کا آرڈر ${
        total + dc
      } کی رقم کے لیے کنفرم ہے؟ یا آپ مزید کچھ آرڈر کرنا چاہتے ہیں؟

 `,
    );

    const url = `https://wa.me/${number}${`?text=${encodedMessage}`}`;

    Linking.openURL(url).catch(err => alert(err));
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <StatusBar
        backgroundColor={COLOR.BACKGROUND_COLOR}
        barStyle={'dark-content'}
      />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLOR.BACKGROUND_COLOR,
          paddingRight: responsiveWidth(5),
          elevation: 3,

          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <IMAGES.Test
            height={responsiveHeight(8)}
            width={responsiveWidth(16)}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLOR.SUB_HEADING,
            fontFamily: FONTS.POPPINS_SEMI_BOLD,
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            paddingTop: responsiveHeight(0.4),
          }}>
          Order Details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
        }}>
        <Modal animationType="slide" transparent={true} visible={pickup}>
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
                Are you sure to{' '}
                {`${status === OrderStatus.PENDING ? 'accept' : 'deliver'}`}{' '}
                this order?
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
                    setPickup(false);
                  }}
                />
                <Button
                  title={status === OrderStatus.PENDING ? 'Accept' : 'Deliver'}
                  style={{
                    width: '40%',
                    margin: 2,
                  }}
                  isLoading={isLoading}
                  onPress={() => {
                    status === OrderStatus.PENDING
                      ? acceptOrder(OrderStatus.ACTIVE)
                      : acceptOrder(OrderStatus.DELIVERED);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={reject}>
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
                Are you sure to you want to reject this order?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
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
                    setReject(false);
                  }}
                />
                <Button
                  title={'Reject'}
                  style={{
                    width: '40%',
                    margin: 2,
                  }}
                  isLoading={isLoading}
                  onPress={() => {
                    acceptOrder(OrderStatus.REJECTED);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Text
              style={{
                color: COLOR.SUB_HEADING,
                fontFamily: FONTS.POPPINS_BOLD,
                fontSize: responsiveFontSize(2),
                width: '82%',
              }}>
              # {formattedId}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <View
                style={[
                  styles.statusStyle,
                  {borderColor: col, backgroundColor: bg},
                ]}>
                <Text
                  style={{
                    color: col,
                    fontFamily: FONTS.POPPINS_SEMI_BOLD,
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {status}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <CartUpperItem text="Customer Info" Imaged={IMAGES.HomeCard} />
          </View>

          <View style={styles.namePhone}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <IMAGES.Name height={20} width={20} />
              </View>
              <View
                style={{
                  marginLeft: responsiveWidth(1.5),
                }}>
                <Text style={styles.headings}>Name</Text>
                <Text style={styles.HeadingDetails}>{name}</Text>
              </View>
            </View>
            {/*  */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <IMAGES.Phone height={20} width={20} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    makeWhatsAppLink(phone);
                  }}
                  style={{
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text style={styles.headings}>Phone</Text>
                  <Text style={styles.HeadingDetails}>{phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*  */}
          <View style={styles.namePhone}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <IMAGES.Date height={20} width={20} />
              </View>
              <View
                style={{
                  marginLeft: responsiveWidth(1.5),
                }}>
                <Text style={styles.headings}>Date</Text>
                <Text style={styles.HeadingDetails}>{date}</Text>
              </View>
            </View>
            {/*  */}
            <View>
              <View
                style={{
                  marginRight: responsiveWidth(3),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.Order}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  {/* <IMAGES.Phone height={20} width={20} /> */}
                </View>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text style={styles.headings}>Order Type</Text>
                  <Text style={styles.HeadingDetails}>
                    {orderType?.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*  */}

          {/* <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View style={{justifyContent: 'center'}}>
              <IMAGES.Date height={20} width={20} />
            </View>
            <View
              style={{
                marginLeft: 5,
              }}>
              <Text style={styles.headings}>Date</Text>
              <Text style={styles.HeadingDetails}>{date}</Text>
            </View>
          </View> */}
          {/*  */}
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View>
              <IMAGES.Address height={20} width={20} />
            </View>
            <View
              style={{
                marginLeft: 5,
              }}>
              <Text style={styles.headings}>Address</Text>
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    fontFamily: FONTS.POPPINS_SEMI_BOLD,
                    color: COLOR.SUB_HEADING,
                  }}>
                  {area}
                </Text>
                <Text style={styles.HeadingDetails}>{address}</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineView} />
          {/* {Object.entries(items).map(([key, items]: any) => {
            console.log({items});
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                  }}>
                  <View
                    style={{
                      backgroundColor: COLOR.PRIMARY_COLOR,
                      position: 'absolute',
                      top: 2,
                      right: 0,
                      width: responsiveHeight(2.7),
                      height: responsiveHeight(2.7),
                      borderRadius: responsiveHeight(6),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: responsiveFontSize(1.5),
                        color: COLOR.BACKGROUND_COLOR,
                      }}>
                      {items.length}
                    </Text>
                  </View>

                  <Image
                    source={{
                      uri: items[0].image,
                    }}
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(16),
                      height: responsiveHeight(12),
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
                          {'\n'}
                          {items[0]?.details}
                        </Text>
                      </Text>
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
                </View>
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
          })} */}
          <FlatList
            data={items}
            renderItem={({item, index}) => {
              // console.log({item});
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: responsiveHeight(1),
                    }}>
                    <View
                      style={{
                        backgroundColor: COLOR.PRIMARY_COLOR,
                        position: 'absolute',
                        top: 2,
                        right: 0,
                        width: responsiveHeight(2.7),
                        height: responsiveHeight(2.7),
                        borderRadius: responsiveHeight(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: responsiveFontSize(1.5),
                          color: COLOR.BACKGROUND_COLOR,
                        }}>
                        {item.quantity}
                      </Text>
                    </View>

                    <Image
                      source={{
                        uri: item.productImage,
                      }}
                      resizeMode="contain"
                      style={{
                        width: responsiveWidth(16),
                        height: responsiveHeight(12),
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
                          {item.productName}
                          <Text
                            style={{
                              color: COLOR.DARK_GREY,
                              fontSize: responsiveFontSize(1.8),
                              fontFamily: FONTS.POPPINS_MEDIUM,
                            }}>
                            {'\n'}
                            {item.ProductDetails}
                          </Text>
                        </Text>
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
                          Rs.{item.productPrice}
                        </Text>
                      </View>
                    </View>
                  </View>
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
            }}
          />
        </View>
        {/*  */}
        <View style={styles.innerContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={styles.bottomText}>Amount to Pay</Text>
            <Text
              style={[
                styles.bottomText,
                {color: COLOR.PRIMARY_COLOR, fontFamily: FONTS.POPPINS_BOLD},
              ]}>
              PKR {total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={styles.bottomText}>Delivery Charges</Text>
            <Text
              style={[
                styles.bottomText,
                {
                  color: COLOR.PRIMARY_COLOR,
                  fontFamily: FONTS.POPPINS_BOLD,
                },
              ]}>
              PKR {dc}
            </Text>
          </View>
          <View style={styles.lineView} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={styles.bottomText}>Total Amount</Text>
            <Text
              style={[
                styles.bottomText,
                {color: COLOR.PRIMARY_COLOR, fontFamily: FONTS.POPPINS_BOLD},
              ]}>
              PKR {total + dc}
            </Text>
          </View>
        </View>
        {status === OrderStatus.PENDING && (
          <>
            <Button
              title={'Accept Order'}
              style={{
                width: '90%',
              }}
              onPress={() => {
                setPickup(true);
              }}
            />
            <Button
              title={'Reject Order'}
              style={{
                width: '90%',
                marginTop: responsiveHeight(1),
                // borderColor: 'red',
                backgroundColor: 'red',
                // borderWidth: 1,
              }}
              onPress={() => {
                setReject(true);
              }}
            />
          </>
        )}
        {status === OrderStatus.ACTIVE && (
          <>
            <Button
              title={'Deliver Order'}
              style={{
                width: '90%',
              }}
              onPress={() => {
                setPickup(true);
              }}
            />
            {/* <Button
              title={'Reject Order'}
              style={{
                width: '90%',
                marginTop: responsiveHeight(1),
                // borderColor: 'red',
                backgroundColor: 'red',
                // borderWidth: 1,
              }}
              onPress={() => {
                setReject(true);
              }}
            /> */}
          </>
        )}

        {/* {!hideButton && (
        <LargeButton
          onPress={() => {
            pickupButton
              ? setPickup(true)
              : navigtion.navigate('OrderConfirmation', {
                  saleId: saleId,
                  orderType: orderType,
                  amountToPay: amountToPay,
                  totalAmount:
                    amountToPay +
                    getOrderFromId?.store?.company?.delivery_charges,
                  deliveryCharges:
                    getOrderFromId?.store?.company.delivery_charges,
                  thirdPartyId: getOrderFromId?.customer?.thirdPartyId,
                  totalDiscount: getOrderFromId?.TotalDiscount,
                });
          }}
          btnStyles={{
            backgroundColor: Colors.PRIMARY_BLUE,
            marginBottom: verticalScale(15),
          }}
          textStyles={{
            color: Colors.DEFAULT_WHITE,
            fontFamily: Fonts.POPPINS_MEDIUM,
          }}>
          {pickupButton ? 'Accept' : 'Deliver Order'}
        </LargeButton>
      )} */}
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headings: {
    color: COLOR.DARK_GREY,
    fontSize: responsiveFontSize(1.9),
    letterSpacing: 0.5,
  },
  HeadingDetails: {
    color: COLOR.SUB_HEADING,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: responsiveFontSize(1.8),
  },
  innerContainer: {
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 15,
    padding: 15,
  },
  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  namePhone: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  statusStyle: {
    borderWidth: 0.7,
    backgroundColor: '#F8F8F8',
    padding: 3,
    paddingHorizontal: 7,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 8,
  },
  lineView: {
    width: '100%',
    borderColor: COLOR.GREY,
    borderWidth: 0.5,
    marginVertical: responsiveHeight(1),
  },
  timeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  bottomText: {
    color: 'grey',
    fontSize: 15,
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606F7E',
    opacity: 0.9,
    // paddingVertical: 2,
  },
  modalView: {
    paddingVertical: responsiveHeight(2),
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
});
