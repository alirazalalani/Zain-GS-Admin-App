import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFcmToken();
  }
}
const getFcmToken = async () => {
  try {
    const getFcm: any = await AsyncStorage.getItem('fcmtoken');
    const parseFcm: any = JSON.parse(getFcm);
    console.log('safa working');
    console.log(parseFcm);

    if (parseFcm === null) {
      console.log('adn');
      let fcmToken: any = await messaging().getToken();
      console.log({fcmToken});
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', JSON.stringify(fcmToken));
        console.log(fcmToken, 'new token');
      }
    } else {
      console.log(parseFcm, 'old token');
    }
  } catch (e) {
    Alert.alert('error raised in fcm token');
  }
};
export async function onDisplayNotification(data: any) {
  // Request permissions (required for iOS)
  // await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'check',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    // subtitle: '&#129395;',
    body: data?.notification?.body,

    android: {
      channelId,
    },
  });
}

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('recived in foreground', remoteMessage);
    onDisplayNotification(remoteMessage);
  });
  messaging().setBackgroundMessageHandler(async onMessageReceived => {
    console.log('sayenn bg working of firebsae');
    onDisplayNotification(onMessageReceived);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // onDisplayNotification(remoteMessage);

        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });
};
