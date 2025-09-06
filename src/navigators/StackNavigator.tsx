import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';
import AppStack from './AppStack';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
