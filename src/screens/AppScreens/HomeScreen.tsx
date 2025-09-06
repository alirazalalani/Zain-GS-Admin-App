import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActiveOrderScreen from './ActiveOrderScreen';
import PendingOrderScreen from './PendingOrderScreen';
import DeliveredOrderScreen from './DeliveredOrderScreen';
const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.GREY_BACKGROUND,
      }}>
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
          paddingVertical: responsiveHeight(1.5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLOR.SUB_HEADING,
              fontFamily: FONTS.POPPINS_SEMI_BOLD,
              fontSize: responsiveFontSize(2.5),
              textAlign: 'center',
              paddingTop: responsiveHeight(0.4),
            }}>
            All Orders
          </Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLOR.PRIMARY_COLOR,
          tabBarInactiveTintColor: COLOR.DARK_GREY,
          tabBarLabelStyle: {fontSize: 15, fontFamily: FONTS.POPPINS_SEMI_BOLD},
          // tabBarStyle: { backgroundColor: 'powderblue' },
          tabBarIndicatorStyle: {
            backgroundColor: COLOR.PRIMARY_COLOR,
          },
        }}>
        <Tab.Screen name="New" component={PendingOrderScreen} />
        <Tab.Screen name="Active" component={ActiveOrderScreen} />
        <Tab.Screen name="Completed" component={DeliveredOrderScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default HomeScreen;

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
