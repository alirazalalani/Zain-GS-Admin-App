import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ShopScreen from '../screens/AppScreens/ShopScreen';
import {COLOR, FONTS, IMAGES} from '../constants';
import CartScreen from '../screens/AppScreens/CartScreen';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import HomeScreen from '../screens/AppScreens/HomeScreen';

import {selectBasketItems} from '../redux/Item/itemSlice';
import {useSelector} from 'react-redux';
const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  const items: any = useSelector(selectBasketItems);
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopRightRadius: responsiveHeight(2),
          borderTopLeftRadius: responsiveHeight(2),
          elevation: 50,
          //   shadowOffset: {
          //     width: 0,
          //     height: 2,
          //   },
          //   shadowOpacity: 0.2,
          //   shadowRadius: 3,
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(8.5),
        },
      }}>
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {focused ? (
                  <IMAGES.FirstHomeFocused
                    height={responsiveHeight(6)}
                    width={responsiveHeight(6.5)}
                  />
                ) : (
                  <IMAGES.FirstHome />
                )}
              </View>
            );
          },
        }}
      />

      <Bottom.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {focused ? (
                  <IMAGES.HomeFocused
                    height={responsiveHeight(6)}
                    width={responsiveHeight(6.5)}
                  />
                ) : (
                  <IMAGES.Home
                    height={responsiveHeight(6)}
                    width={responsiveHeight(4.2)}
                  />
                )}
                {/* <Text
                  style={{
                    fontFamily: FONTS.POPPINS_MEDIUM,

                    color: focused ? COLOR.PRIMARY_COLOR : '#808C98',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Shop
                </Text> */}
              </View>
            );
          },
        }}
      />

      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {focused ? (
                  <IMAGES.ProfileFocused
                    height={responsiveHeight(6.5)}
                    width={responsiveHeight(8)}
                  />
                ) : (
                  <IMAGES.Profile
                    height={responsiveHeight(4.6)}
                    width={responsiveHeight(6)}
                  />
                )}
                {/* <Text
                  style={{
                    fontFamily: FONTS.POPPINS_MEDIUM,
                    textAlign: 'center',
                    color: focused ? COLOR.PRIMARY_COLOR : 'black',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Account
                </Text> */}
              </View>
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
