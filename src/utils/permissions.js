import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

const os = Platform.OS;

// define your all permission here

// const cameraPermission =
//   os == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

// export const checkCameraPermission = () => {
//   check(cameraPermission)
//     .then(result => {
//       switch (result) {
//         case RESULTS.UNAVAILABLE:
//           break;
//         case RESULTS.DENIED:
//           request(PERMISSIONS.IOS.CAMERA || PERMISSIONS.ANDROID.CAMERA);

//           break;
//         case RESULTS.GRANTED:
//           break;
//         case RESULTS.BLOCKED:
//           break;
//       }
//     })
//     .catch(error => {
//       // …
//     });
// };

// const writePermission =
//   os == 'ios'
//     ? PERMISSIONS.IOS.MEDIA_LIBRARY
//     : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

// export const checkWritePermission = () => {
//   check(writePermission)
//     .then(result => {
//       switch (result) {
//         case RESULTS.UNAVAILABLE:
//           break;
//         case RESULTS.DENIED:
//           request(writePermission);

//           break;
//         case RESULTS.GRANTED:
//           break;
//         case RESULTS.BLOCKED:
//           break;
//       }
//     })
//     .catch(error => {
//       // …
//     });
// };

// const multiplePermissionLocation =
//   Platform.OS == 'android'
//     ? [
//         PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
//         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       ]
//     : [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];

// export const checkLocationPermission = async cb => {
//   const result = await checkMultiple(multiplePermissionLocation);
//   // For Android Permissions
//   if (Platform.OS == 'android') {
//     if (
//       result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.GRANTED ||
//       // result["android.permission.ACCESS_COARSE_LOCATION"] == RESULTS.GRANTED ||
//       result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.LIMITED
//       // result["android.permission.ACCESS_COARSE_LOCATION"] == RESULTS.LIMITED
//     ) {
//       cb();
//     } else if (
//       result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.DENIED ||
//       result['android.permission.ACCESS_COARSE_LOCATION'] == RESULTS.DENIED
//     ) {
//       requestLocationPermission(cb);
//     } else if (
//       result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.BLOCKED ||
//       result['android.permission.ACCESS_COARSE_LOCATION'] == RESULTS.BLOCKED
//     ) {
//       showAlertBox('location');
//     } else if (
//       result['android.permission.ACCESS_FINE_LOCATION'] ==
//         RESULTS.UNAVAILABLE ||
//       result['android.permission.ACCESS_COARSE_LOCATION'] == RESULTS.UNAVAILABLE
//     ) {
//       showAlertBox('N/A');
//     }
//   }

//   // For iOS Permissions
//   else if (Platform.OS == 'ios') {
//     if (
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.GRANTED ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.GRANTED ||
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.LIMITED ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.LIMITED
//     ) {
//       cb();
//     } else if (
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.DENIED ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.DENIED
//     ) {
//       requestLocationPermission(cb);
//     } else if (
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.BLOCKED ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.BLOCKED
//     ) {
//       showAlertBox('location');
//     } else if (
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.UNAVAILABLE ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.UNAVAILABLE
//     ) {
//       showAlertBox('N/A');
//     }
//   }
// };

// const VoicePermission =
//   Platform.OS == 'android' ? [PERMISSIONS.ANDROID.RECORD_AUDIO] : [];

// export const requestVoicePermission = async cb => {
//   const result = await requestMultiple(VoicePermission);
//   // For Android Permissions
//   if (Platform.OS == 'android') {
//     if (result['android.permission.RECORD_AUDIO'] == RESULTS.GRANTED) {
//       cb();
//     }
//     if (result['android.permission.RECORD_AUDIO'] == RESULTS.BLOCKED) {
//       showAlertBox('read & write and voice');
//     }
//   } else if (Platform.OS == 'ios') {
//   }
// };

// export const requestLocationPermission = async () => {
//   const result = await requestMultiple(multiplePermissionLocation);
//   // For Android Permissions
//   if (Platform.OS == 'android') {
//     if (
//       result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.GRANTED ||
//       result['android.permission.ACCESS_COARSE_LOCATION'] == RESULTS.GRANTED
//     ) {
//       cb();
//     }

//     if (
//       result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.BLOCKED ||
//       result['android.permission.ACCESS_COARSE_LOCATION'] == RESULTS.BLOCKED
//     ) {
//       showAlertBox('location');
//     }
//   } else if (Platform.OS == 'ios') {
//     if (
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.GRANTED ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.GRANTED
//     ) {
//       cb();
//     } else if (
//       result['ios.permission.LOCATION_ALWAYS'] == RESULTS.BLOCKED ||
//       result['ios.permission.LOCATION_WHEN_IN_USE'] == RESULTS.BLOCKED
//     ) {
//       showAlertBox('location');
//     }
//   }
// };

// const showAlertBox = featureType => {
//   /* if certain feature is not available in device */
//   if (featureType == 'N/A')
//     return alert('This feature is not available in your device');

//   /* -- */

//   return Alert.alert(
//     `This feature requires ${featureType} access`,
//     `Go to settings and and allow ${featureType} permissions to proceed`,
//     [
//       {text: 'Open Settings', onPress: async () => redirectToSettings()},
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//     ],
//     {cancelable: false},
//   );
// };
// const redirectToSettings = () => {
//   if (Platform.OS == 'ios') return Linking.openURL('app-settings:');

//   return Linking.openSettings();
// };
// Notification

const requestNotificationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      throw new Error(RESULTS.UNAVAILABLE);
    case RESULTS.DENIED:
      checkNotificationPermission();
    case RESULTS.GRANTED:
      return RESULTS.GRANTED;
    case RESULTS.BLOCKED:
  }
};
const checkNotificationPermission = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  const result = await check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      throw new Error(RESULTS.UNAVAILABLE);
    case RESULTS.DENIED:
      try {
        const request_result = await requestNotificationPermission();
        return request_result;
      } catch (error) {
        throw new Error(error);
      }
    case RESULTS.GRANTED:
      return RESULTS.GRANTED;
    case RESULTS.BLOCKED:
  }
};
export default {
  //   checkCameraPermission,
  requestNotificationPermission,
  checkNotificationPermission,
};
