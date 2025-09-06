import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLOR, FONTS, IMAGES} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {apiMiddleware} from '../../utils/HelperFunction';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const ShopScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation: any = useNavigation();
  const [cat, setCat] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [categoryCount, setCategoryCount] = useState();
  const [loadData, setLoadData] = useState(false);

  // const getCategories = async () => {
  //   setIsLoading(true);
  //   const response = await apiMiddleware({
  //     url: '/cat/category',
  //     method: 'get',
  //     navigation,
  //   });
  //   if (response) {
  //     setCat(response.data);
  //     setIsLoading(false);
  //     setRefreshing(false);
  //   }
  //   setIsLoading(false);
  //   setRefreshing(false);
  // };

  const getCategories = async (offset: number) => {
    if (cat.length == 0) {
      setIsLoading(true);
    }

    const response = await apiMiddleware({
      url: `/cat/category?offset=${offset}`,
      method: 'get',
      navigation,
    });
    console.log(response, 'RESPONSE');
    if (response) {
      setCategoryCount(response?.count);
      if (cat?.length > 0) {
        setCat([...cat, ...response?.data]);
      } else {
        setCat(response?.data);
      }
      setLoadData(false);
      setRefreshing(false);
    }
    setIsLoading(false);
    setRefreshing(false);
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getCategories(0);
  }, []);

  const handleScroll = event => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const offsetY = contentOffset.y;
    const contentHeight = contentSize.height;
    const viewportHeight = layoutMeasurement.height;
    if (offsetY + viewportHeight >= contentHeight - 20 && !loadData) {
      if (categoryCount > cat?.length) {
        setLoadData(true);
        getCategories(cat.length);
      }
    }
  };
  useEffect(() => {
    getCategories(0);
  }, []);
  return (
    <View style={styles.container}>
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
          Find Category
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Search');
        }}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          margin: responsiveHeight(2),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <TextInput
            placeholder="Search Item"
            style={{
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveWidth(4),
              color: COLOR.SUB_HEADING,
            }}
          /> */}
        <Text
          style={{
            paddingVertical: responsiveHeight(1.5),
            paddingHorizontal: responsiveWidth(4),
            color: COLOR.SUB_HEADING,
          }}>
          Search Item
        </Text>

        <IMAGES.Search
          width={responsiveWidth(10)}
          height={responsiveHeight(4)}
        />
      </TouchableOpacity>
      {cat.length > 0 && !isLoading && (
        <FlatList
          data={cat}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          keyExtractor={(item, index) => item._id}
          numColumns={2}
          contentContainerStyle={{
            marginVertical: responsiveHeight(3.5),
            paddingHorizontal: responsiveWidth(5.2),
            paddingBottom: responsiveHeight(4),
          }}
          renderItem={({item, index}) => {
            const num = Math.floor(Math.random() * 4);
            // console.log({num});
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AllProduct', {
                    categoryId: item.categoryId,
                    categoryName: item.name,
                  });
                }}
                activeOpacity={0.5}
                style={{
                  height: responsiveHeight(22),
                  width: responsiveWidth(42),
                  backgroundColor: COLOR.PRIMARY_COLOR,
                  borderRadius: responsiveHeight(2),
                  margin: responsiveHeight(0.8),
                  flex: 1,
                  // borderColor: COLOR.PRIMARY_COLOR,
                  // borderWidth: 0.4,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  elevation: 4,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(100),
                    // height: responsiveHeight(12),
                    flex: 1,
                    overflow: 'hidden',
                    alignSelf: 'center',
                  }}
                />
                <View style={{backgroundColor: 'white'}}>
                  <Text
                    style={{
                      color: COLOR.SUB_HEADING,
                      fontFamily: FONTS.POPPINS_SEMI_BOLD,
                      fontSize: responsiveFontSize(1.8),
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={COLOR.PRIMARY_COLOR} />
        </View>
      )}
      {loadData && (
        <ActivityIndicator
          size={'small'}
          color={COLOR.PRIMARY_COLOR}
          style={{marginVertical: 10}}
        />
      )}
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.GREY_BACKGROUND,
  },
});
