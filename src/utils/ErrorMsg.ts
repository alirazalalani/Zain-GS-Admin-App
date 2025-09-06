import {showMessage} from 'react-native-flash-message';

export const errorMessage = (msg: any, statusCode?: any, position?: any) => {
  if (Array.isArray(msg)) {
    console.log({array: Array.isArray(msg)});
    showMessage({
      message: `Error ${statusCode}`,
      description: msg[0],
      type: 'danger',
      duration: 2500,
      position: 'top',
    });
  } else {
    showMessage({
      message: `Error ${statusCode}`,
      description: msg,
      type: 'danger',
      duration: 2500,
      position: 'top',
    });
  }
};
export const successMessage = (msg: any, title = 'Success') => {
  showMessage({
    message: title,
    description: msg,
    type: 'success',
    duration: 2500,
    position: 'top',
  });
};
