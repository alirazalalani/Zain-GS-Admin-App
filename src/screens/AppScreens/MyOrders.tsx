import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {apiMiddleware, setColor} from '../../utils/HelperFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import Heading from '../../components/Heading';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import CardText from '../../components/CardText';
import {Dropdown} from 'react-native-element-dropdown';
import CartUpperItem from '../../components/CartUpperItem';
import Button from '../../components/Button';
import {Card} from '@rneui/base';
const MyOrders = () => {
  const [orders, setOrders] = useState<any>([]);
  const navigation: any = useNavigation();
  const [showDrop, setShowDrop] = useState([
    {
      name: 'Pending',
      value: 'pending',
    },
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Delivered',
      value: 'delivered',
    },
    {
      name: 'Rejected',
      value: 'rejected',
    },
  ]);
  const [show, setShow] = useState(false);
  const [statusFilter, setStatusFilter] = useState('pending');

  const getActiveOrders = async () => {
    const getItems: any = await AsyncStorage.getItem('userData');
    const parsedItem: any = await JSON.parse(getItems);

    console.log({parsedItem: parsedItem});
    const response = await apiMiddleware({
      url: `/order/all?status=${statusFilter}&userId=${parsedItem._id}`,
      method: 'get',
    });
    if (response) {
      console.log({response: response[0]});
      setOrders(response);
    }
  };

  useEffect(() => {
    getActiveOrders();
  }, [statusFilter]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.GREY_BACKGROUND,
      }}>
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
            My Orders
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setShow(!show);
          }}>
          <IMAGES.Filter />
        </TouchableOpacity>
      </View>
      {show && (
        <View
          style={{
            backgroundColor: COLOR.PRIMARY_COLOR,
            position: 'absolute',
            zIndex: 100,
            top: responsiveWidth(12),
            overflow: 'hidden',
            right: responsiveWidth(5),
            width: '30%',
          }}>
          {showDrop.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log(item);
                  setShow(false);
                  setStatusFilter(item.value);
                }}
                style={{
                  borderColor: COLOR.GREY_BACKGROUND,
                  borderWidth: 1,
                  padding: 2,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: responsiveFontSize(2),
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {orders.length > 0 && (
        <View
          style={
            {
              // paddingHorizontal: responsiveWidth(5.2),
            }
          }>
          <FlatList
            data={orders}
            contentContainerStyle={{
              // paddingHorizontal: 1.5,
              paddingBottom: responsiveHeight(10),
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any, index) => index.toString()}
            onEndReached={() => {
              console.log('bhai end');
            }}
            renderItem={({item, index}) => {
              // Create a new Date object with the UTC time and set its timezone to Pakistan Standard Time (UTC +5)
              const date = new Date(item.createdAt);

              const options: any = {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              };
              const formattedDate = date.toLocaleDateString('en-GB', options);

              const {col, bg} = setColor(item.status);

              const groupedItems = orders[index].orderItems?.reduce(
                (results: any, item: any) => {
                  (results[item.id] = results[item.id] || []).push(item);
                  return results;
                },
                {},
              );

              return (
                <View style={styles.container} key={index}>
                  <View style={styles.cardStyle}>
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
                        left: responsiveWidth(-1),
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: responsiveFontSize(1.5),
                          color: 'white',
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: responsiveWidth(5),
                        alignSelf: 'flex-end',
                      }}>
                      {/* <Text
                        style={{
                          color: COLOR.SUB_HEADING,
                          fontSize: responsiveFontSize(1.7),
                          fontFamily: FONTS.POPPINS_SEMI_BOLD,
                        }}>
                        #
                        {item.orderId.substring(
                          0,
                          item.orderId.indexOf(
                            '-',
                            item.orderId.indexOf(
                              '-',
                              item.orderId.indexOf(
                                '-',
                                item.orderId.indexOf('-') + 1,
                              ) + 1,
                            ),
                          ),
                        )}
                      </Text> */}
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
                          {item?.status}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: responsiveWidth(5),
                      }}>
                      <CartUpperItem
                        text={'Zain General Store'}
                        Imaged={IMAGES.ShopCard}
                      />
                      <Text
                        style={{
                          color: COLOR.SUB_HEADING,
                          marginTop: responsiveHeight(1.2),
                          fontFamily: FONTS.POPPINS_REGULAR,
                        }}>
                        Zain General Store Gulistan e fatima phase-1, central
                        jail hyd
                      </Text>
                      <View style={styles.lineView} />
                      <CartUpperItem
                        text="Delivery Location"
                        Imaged={IMAGES.HomeCard}
                      />
                      <Text
                        style={{
                          color: 'black',
                          marginTop: 10,
                          fontFamily: FONTS.POPPINS_REGULAR,
                        }}>
                        {item?.address}
                      </Text>

                      <View style={styles.lineView} />

                      {Object.entries(groupedItems).map(([key, items]: any) => {
                        return (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: responsiveHeight(1),
                                // paddingHorizontal: responsiveWidth(5.2),
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
                      })}
                      <CardText name={'Ordered On'} value={formattedDate} />
                      <CardText
                        name={'Order Id'}
                        value={item.orderId.substring(
                          0,
                          item.orderId.indexOf(
                            '-',
                            item.orderId.indexOf(
                              '-',
                              item.orderId.indexOf(
                                '-',
                                item.orderId.indexOf('-') + 1,
                              ) + 1,
                            ),
                          ),
                        )}
                      />
                      <CardText
                        name={'Deliver Charges'}
                        value={`Rs. ${item.delivery_fee}`}
                      />
                      <CardText name={'Amount'} value={`Rs. ${item.amount}`} />
                      <CardText
                        name={'Grand Total'}
                        value={`Rs. ${item.amount + item.delivery_fee}`}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
      {orders.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No {statusFilter} Orders Found</Text>
        </View>
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  cardStyle: {
    height: undefined,
    backgroundColor: COLOR.BACKGROUND_COLOR,
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveHeight(2),
    paddingVertical: responsiveHeight(2),
    elevation: 5,
  },
  lineView: {
    width: '100%',
    borderColor: COLOR.GREY,
    borderWidth: 0.5,
    marginVertical: responsiveHeight(2.2),
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
});
