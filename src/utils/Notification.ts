import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const messaging = getMessaging(getApp());

export const requestUserPermission = async () => {
  const settings = await notifee.requestPermission();
  if (
    settings.authorizationStatus === 0 || // AuthorizationStatus.DENIED
    settings.authorizationStatus === -1 // AuthorizationStatus.NOT_DETERMINED
  ) {
    console.log('Notification Permission denied');
    return false;
  }
  return true;
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

      const fcmToken: any = await messaging().getToken();

      console.log({fcmToken});
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', JSON.stringify(fcmToken));
        console.log(fcmToken, 'new token');
      }
    } else {
      console.log(parseFcm, 'old token');
    }
  } catch (e: any) {
    Alert.alert('error raised in fcm token', e.message || String(e));
  }
};
export async function onDisplayNotification(data: any) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'custom_sound_channel_v1',
    name: 'Custom Sound Channel',
    sound: 'check',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });

  await notifee.displayNotification({
    title: data?.notification?.title || data?.data?.title,
    body: data?.notification?.body || data?.data?.body,
    android: {
      channelId,
      sound: 'check',
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'check.mp3',
      interruptionLevel: 'timeSensitive',
      critical: true,
      criticalVolume: 1.0,
    },
  });
}

export const notificationListner = async () => {
  // Create the channel immediately so it's ready for background FCM notifications
  await notifee.createChannel({
    id: 'custom_sound_channel_v1',
    name: 'Custom Sound Channel',
    sound: 'check',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });

  // Foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('Received in foreground', remoteMessage);
    await onDisplayNotification(remoteMessage);
  });

  // Background to Foreground
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Killed to Foreground
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
