import {
  AuthorizationStatus,
  getMessaging,
  getToken,
} from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApp} from '@react-native-firebase/app';

const messaging = getMessaging(getApp());

export const requestUserPermission = async () => {
  const settings = await notifee.requestPermission();
  if (
    settings.authorizationStatus === AuthorizationStatus.DENIED ||
    settings.authorizationStatus === AuthorizationStatus.NOT_DETERMINED
  ) {
    console.log('Notification Permission deniesd');
    return false;
  }
};
export const getFcmToken = async () => {
  try {
    const getFcm: any = await AsyncStorage.getItem('fcmtoken');
    const parseFcm: any = JSON.parse(getFcm);
    console.log('safa working');
    console.log(parseFcm);

    if (parseFcm === null) {
      console.log('adn');
      // const token = await getToken(messaging);

      const fcmToken: any = await getToken(messaging);

      console.log({fcmToken});
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', JSON.stringify(fcmToken));
        console.log(fcmToken, 'new token');
      }
    } else {
      console.log(parseFcm, 'old token');
    }
  } catch (e) {
    Alert.alert('error raised in fcm token', e);
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
    vibration: true,
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    // subtitle: '&#129395;',
    body: data?.notification?.body,

    android: {
      channelId,
      sound: 'check', // Ex
    },
  });
}

export const notificationListner = async () => {
  messaging.onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging.onMessage(async remoteMessage => {
    console.log('recived in foreground', remoteMessage);
    onDisplayNotification(remoteMessage);
  });
  messaging.setBackgroundMessageHandler(async onMessageReceived => {
    console.log('sayenn bg working of firebsae');
    onDisplayNotification(onMessageReceived);
  });

  messaging.getInitialNotification().then(remoteMessage => {
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
