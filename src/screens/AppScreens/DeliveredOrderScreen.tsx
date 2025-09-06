import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {apiMiddleware, setColor} from '../../utils/HelperFunction';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CardText from '../../components/CardText';
import CartUpperItem from '../../components/CartUpperItem';
import Button from '../../components/Button';

const DeliveredOrderScreen = () => {
  const [orders, setOrders] = useState<any>([]);
  const navigation: any = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getDeliveredOrders = async () => {
    setIsLoading(true);
    setRefreshing(true);
    const response = await apiMiddleware({
      url: `/order/all?status=rejected&status=delivered`,
      method: 'get',
      navigation: navigation,
    });
    if (response) {
      setOrders(response);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getDeliveredOrders();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDeliveredOrders();
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.GREY_BACKGROUND,
      }}>
      {orders.length > 0 && !isLoading && (
        <View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={orders}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(10),
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any, index) => index.toString()}
            onEndReached={() => {
              // console.log('bhai end');
            }}
            renderItem={({item, index}) => {
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
                      {/* <CartUpperItem
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
                      <View style={styles.lineView} /> */}
                      <CartUpperItem
                        text="Delivery Location"
                        Imaged={IMAGES.HomeCard}
                      />
                      <Text
                        style={{
                          marginTop: 10,
                          fontFamily: FONTS.POPPINS_SEMI_BOLD,
                          color: COLOR.SUB_HEADING,
                        }}>
                        {item?.location_area}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.POPPINS_REGULAR,
                          color: COLOR.SUB_HEADING,
                        }}>
                        {item?.address}
                      </Text>

                      <View style={styles.lineView} />

                      <CardText
                        name={'Ordered By'}
                        value={`${item.orderByUser}`}
                      />
                      <CardText name={'Area'} value={`${item.location_area}`} />
                      <CardText name={'Ordered On'} value={formattedDate} />
                      <CardText
                        name={'Grand Total'}
                        value={`Rs. ${item.amount + item.delivery_fee}`}
                      />
                    </View>
                    <Button
                      title={'Details'}
                      onPress={() => {
                        navigation.navigate('OrderDetails', {
                          name: item?.orderByUser,
                          phone: item?.mobile,
                          date: formattedDate,
                          address: item?.address,
                          items: item?.orderItems,
                          orderId: item?.orderId,
                          status: item?.status,
                          total: +item?.amount,
                          dc: +item.delivery_fee,
                          area: item?.location_area,
                        });
                      }}
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingVertical: responsiveHeight(1),
                        marginTop: responsiveHeight(1.5),
                        marginHorizontal: responsiveWidth(3),
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
      {orders.length === 0 && !isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: responsiveFontSize(2.5),
            }}>
            No Delivered Orders found
          </Text>
        </View>
      )}
      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={COLOR.PRIMARY_COLOR} />
        </View>
      )}
    </View>
  );
};

export default DeliveredOrderScreen;

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
