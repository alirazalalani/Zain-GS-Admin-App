import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './src/navigators/AppStack';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import {
  notificationListner,
  onDisplayNotification,
  requestUserPermission,
} from './src/utils/Notification';
import InfoModal from './src/components/InfoModal';
import NetInfo from '@react-native-community/netinfo';
import { IMAGES } from './src/constants';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   onDisplayNotification(remoteMessage);
// });

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [isConnected, setIsConnected] = useState<any>(true);

  const getData = async () => {
    try {
      const getUserItem: any = await AsyncStorage.getItem('userData');
      const parseItem: any = await JSON.parse(getUserItem);

      setData(parseItem);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestUserPermission();
    notificationListner();
    getData();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide(); // Hide the splash screen once data fetching is complete
    }
  }, [loading]);

  if (loading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        {!loading && !data && <StackNavigator />}
        {!loading && data && <AppStack />}
        {!isConnected && (
          <InfoModal
            message={'No Internet Connection'}
            Photo={IMAGES.NoInternet}
            btnText={'Close'}
            onPress={() => {}}
          />
        )}
        <FlashMessage position="bottom" icon="auto" />
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
