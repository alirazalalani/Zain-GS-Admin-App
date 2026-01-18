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
// import {
//   notificationListner,
//   onDisplayNotification,
//   requestUserPermission,
// } from './src/utils/Notification';
import InfoModal from './src/components/InfoModal';
import NetInfo from '@react-native-community/netinfo';
import {IMAGES} from './src/constants';
import {
  getFcmToken,
  notificationListner,
  requestUserPermission,
} from './src/utils/Notification';
import Permissions from './src/utils/permissions';
import {Platform} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   onDisplayNotification(remoteMessage);
// });

const App = () => {
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [isConnected, setIsConnected] = useState<any>(true);

  //   if (Platform.OS === 'android') {
  //     if (Platform.Version >= 33) {
  //       Permissions?.checkNotificationPermission()
  //         .then(async res => {
  //           // await FirebaseNotifications.notificationListener();
  //         })
  //         .catch(e => {
  //           console.log('e notification perm', e);
  //         });
  //     } else {
  //       await FirebaseNotifications.requestUserPermission();
  //       // await FirebaseNotifications.notificationListener();
  //     }
  //   } else {
  //     let permitted = await FirebaseNotifications.requestUserPermission();

  //     if (permitted) {
  //       // await FirebaseNotifications.notificationListener();
  //     }
  //   }

  //   return () => {
  //     if (FirebaseNotifications.foreGroundListener) {
  //       FirebaseNotifications.foreGroundListener;
  //     }
  //   };
  // };
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

  const getPushNotifications = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        Permissions?.checkNotificationPermission()
          .then(async res => {
            await getFcmToken();
            await notificationListner();
            // await FirebaseNotifications.notificationListener();
          })
          .catch(e => {
            console.log('e notification perm', e);
          });
      } else {
        await requestUserPermission().then(async () => {
          await getFcmToken();
          await notificationListner();
        });

        // await FirebaseNotifications.notificationListener();
      }
    } else {
      let permitted = await requestUserPermission();

      if (permitted) {
        await getFcmToken();
        await notificationListner();

        // await FirebaseNotifications.notificationListener();
      }
    }

    // return () => {
    //   if (FirebaseNotifications.foreGroundListener) {
    //     FirebaseNotifications.foreGroundListener;
    //   }
    // };
  };
  useEffect(() => {
    getPushNotifications();
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
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
