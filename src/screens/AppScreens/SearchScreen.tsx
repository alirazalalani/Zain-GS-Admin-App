import {
    ActivityIndicator,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {COLOR, FONTS, IMAGES} from '../../constants';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import {apiMiddleware} from '../../utils/HelperFunction';
  import {useNavigation} from '@react-navigation/native';
  
  const SearchScreen = () => {
    const navigation: any = useNavigation();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const searchNow = async () => {
      if (search.length >= 1) {
        setIsLoading(true);
        const response = await apiMiddleware({
          url: `/item/all?search=${search}`,
          method: 'get',
        });
        if (response) {
          // console.log({response});
          setSearchResult(response.data);
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.GREY_BACKGROUND,
          paddingHorizontal: responsiveWidth(5.2),
        }}>
        <StatusBar
          backgroundColor={COLOR.GREY_BACKGROUND}
          barStyle={'dark-content'}
        />
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            marginVertical: responsiveHeight(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            value={search}
            placeholder="Search Item"
            autoFocus={true}
            returnKeyLabel="Search"
            returnKeyType="search"
            style={{
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveWidth(4),
              color: COLOR.SUB_HEADING,
              flex: 1,
            }}
            onChangeText={(txt: any) => {
              setSearch(txt);
            }}
            onSubmitEditing={() => {
              // console.log('bhai');
              searchNow();
            }}
          />
          <TouchableOpacity
            onPress={() => {
              searchNow();
            }}>
            <IMAGES.Search
              width={responsiveWidth(10)}
              height={responsiveHeight(4)}
            />
          </TouchableOpacity>
        </View>
        {!isLoading && searchResult.length > 0 && (
          <FlatList
            data={searchResult}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item._id}
            numColumns={2}
            renderItem={({item, index}) => {
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
                    paddingTop: responsiveHeight(1),
                    elevation: 2,
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
                    <Text style={{fontFamily: FONTS.POPPINS_REGULAR}}>355ml</Text>
                  </View>
                  <View
                    style={
                      {
                        // backgroundColor: 'red',
                      }
                    }>
                    <View
                      style={{
                        marginLeft: responsiveWidth(2),
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONTS.POPPINS_SEMI_BOLD,
                          color: COLOR.SUB_HEADING,
                          fontSize: responsiveFontSize(1.8),
                        }}>
                        {item.price} RS
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ProductDetails', {
                            id: item._id,
                          });
                        }}>
                        <IMAGES.AddBtn
                          height={responsiveHeight(5)}
                          width={responsiveWidth(12)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        {isLoading && (
          <View style={styles.basic}>
            <ActivityIndicator size={'large'} color={COLOR.PRIMARY_COLOR} />
          </View>
        )}
        {!isLoading && searchResult.length === 0 && (
          <View style={styles.basic}>
            <Text>Item Not Found</Text>
          </View>
        )}
      </View>
    );
  };
  
  export default SearchScreen;
  
  const styles = StyleSheet.create({
    basic: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  });
  