/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onDisplayNotification} from './src/utils/Notification';

// FCM Background Handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // Only display if it's a data-only message to avoid duplicates
  if (!remoteMessage.notification) {
    await onDisplayNotification(remoteMessage);
  }
});

// Notifee Background Event Handler
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  console.log('Background event received', type);

  if (type === EventType.PRESS && pressAction?.id === 'default') {
    // Handle notification press in background/killed state
    console.log('User pressed notification in background', notification);
  }
});

AppRegistry.registerComponent(appName, () => App);
