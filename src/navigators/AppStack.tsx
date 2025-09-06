import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import AllProductScreen from '../screens/AppScreens/AllProductScreen';
import StackNavigator from './StackNavigator';
import UserDetailsScreen from '../screens/AppScreens/UserDetailsScreen';
import ProductDetails from '../screens/AppScreens/ProductDetails';
import SuccessfullPlace from '../screens/AppScreens/SuccessfullPlace';
import MyOrders from '../screens/AppScreens/MyOrders';
import OrderDetails from '../screens/AppScreens/OrderDetails';
import SearchScreen from '../screens/AppScreens/SearchScreen';

const App = createNativeStackNavigator();

const AppStack = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <App.Screen name="Bottom" component={BottomNavigator} />
      <App.Screen name="AllProduct" component={AllProductScreen} />
      <App.Screen name="UserDetails" component={UserDetailsScreen} />
      <App.Screen name="ProductDetails" component={ProductDetails} />
      <App.Screen name="Success" component={SuccessfullPlace} />
      <App.Screen name="MyOrders" component={MyOrders} />
      <App.Screen name="OrderDetails" component={OrderDetails} />
      <App.Screen name="Search" component={SearchScreen} />

      <App.Screen name="Stack" component={StackNavigator} />
    </App.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
