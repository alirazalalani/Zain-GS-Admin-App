import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {apiMiddleware} from '../../utils/HelperFunction';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {selectBasketItems} from '../../redux/Item/itemSlice';

const AllProductScreen = () => {
  const route: any = useRoute();
  const {categoryId, categoryName} = route.params;
  const [allItems, setAllItems] = useState<any>([]);
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [itemCount, setItemCount] = useState();
  const getItems = async (offset: number) => {
    if (allItems.length == 0) {
      setIsLoading(true);
    }

    const response = await apiMiddleware({
      url: `/item/all?categoryId=${categoryId}&offset=${offset}`,
      method: 'get',
      navigation,
    });
    if (response) {
      console.log({resp: response.data});
      // setAllItems(response.data);
      setItemCount(response?.count);
      if (allItems?.length > 0) {
        setAllItems([...allItems, ...response?.data]);
      } else {
        setAllItems(response?.data);
      }
      setLoadData(false);
      setIsLoading(false);
      // dispatch(LOADERSTOP());
    }
    // dispatch(LOADERSTOP());
    setIsLoading(false);
  };
  const handleScroll = event => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const offsetY = contentOffset.y;
    const contentHeight = contentSize.height;
    const viewportHeight = layoutMeasurement.height;
    if (offsetY + viewportHeight >= contentHeight - 20 && !loadData) {
      if (itemCount > allItems?.length) {
        setLoadData(true);
        getItems(allItems.length);
      }
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     getItems();
  //   }, []),
  // );
  useEffect(() => {
    getItems(0);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLOR.BACKGROUND_COLOR}
        barStyle={'dark-content'}
      />

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
            {categoryName}
          </Text>
        </View>
      </View>
      {allItems.length > 0 && !isLoading && (
        <FlatList
          data={allItems}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item._id}
          numColumns={2}
          onScroll={handleScroll}
          contentContainerStyle={{
            marginTop: responsiveHeight(3.5),
            paddingBottom: responsiveHeight(5),
            paddingHorizontal: responsiveWidth(5.2),
          }}
          renderItem={({item, index}) => {
            // console.log({itemOfALl: item});
            return (
              <TouchableOpacity
                onPress={() => {
                  // console.log(item._id);
                  navigation.navigate('ProductDetails', {
                    id: item._id,
                  });
                }}
                activeOpacity={0.5}
                key={index}
                style={{
                  width: responsiveWidth(42),
                  backgroundColor: COLOR.BACKGROUND_COLOR,
                  borderRadius: responsiveHeight(2),
                  margin: responsiveHeight(0.8),
                  flex: 1,
                  paddingVertical: responsiveHeight(2),
                  elevation: 5,
                }}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(18),
                    alignSelf: 'center',
                  }}
                />
                <View style={{marginLeft: responsiveWidth(2), width: '90%'}}>
                  <Text
                    style={{
                      color: COLOR.SUB_HEADING,
                      fontFamily: FONTS.POPPINS_SEMI_BOLD,
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{fontFamily: FONTS.POPPINS_REGULAR, color: 'grey'}}>
                    {item?.details}
                  </Text>
                </View>
                {/* 
                <Text
                  style={{
                    fontFamily: FONTS.POPPINS_SEMI_BOLD,
                    color: COLOR.SUB_HEADING,
                    fontSize: responsiveFontSize(1.8),
                    alignSelf: 'flex-end',
                    paddingHorizontal: responsiveWidth(2),
                  }}>
                  Rs. {item.price}
                </Text> */}
                <View
                  style={{
                    marginLeft: responsiveWidth(2),
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    {+item.oldPrice > 0 && (
                      <Text
                        style={{
                          fontFamily: FONTS.POPPINS_SEMI_BOLD,
                          color: COLOR.ERROR,
                          fontSize: responsiveFontSize(1.8),
                          textDecorationLine: 'line-through',
                        }}>
                        RS {item.oldPrice}
                      </Text>
                    )}

                    <Text
                      style={{
                        fontFamily: FONTS.POPPINS_SEMI_BOLD,
                        color: COLOR.SUB_HEADING,
                        fontSize: responsiveFontSize(1.8),
                      }}>
                      RS {item.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {isLoading && (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color={COLOR.PRIMARY_COLOR} />
        </View>
      )}
      {loadData && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: COLOR.PRIMARY_COLOR,
              fontFamily: FONTS.POPPINS_SEMI_BOLD,
              marginRight: 10,
            }}>
            Loading More Data
          </Text>
          <ActivityIndicator
            size={'small'}
            color={COLOR.PRIMARY_COLOR}
            style={{marginVertical: 10}}
          />
        </View>
      )}
      {allItems.length === 0 && !isLoading && (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: 'black', fontSize: responsiveFontSize(2.5)}}>
            Items Comming Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default AllProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.GREY_BACKGROUND,
  },
});
