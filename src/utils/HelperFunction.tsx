import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiMiddlewareInterface} from '../interface';
import {BASE_URL, Content_Type} from './Base_Url';
import {errorMessage} from './ErrorMsg';
import { OrderStatus } from '../constants/ENUMS';
// import { BASE_URL, Content_Type } from "./Base_Url";
// import { errorMessage } from "../Components/Error";
export const apiMiddleware = async (payload: apiMiddlewareInterface) => {
  const getUserData: any = await AsyncStorage.getItem('userData');
  const userData: any = JSON.parse(getUserData);
  const axiosPayload: any = {
    url: `${BASE_URL}${payload.url}`,
    method: payload.method,
    headers: {
      'Content-Type': payload.contentType
        ? payload.contentType
        : Content_Type.JSON,
    },
  };
  if (payload.data) {
    axiosPayload.data = payload.data;
  }
  if (userData && userData.token) {
    axiosPayload.headers = {
      ...axiosPayload.headers,
      Authorization: `Bearer ${userData.token}`,
    };
  }

  console.log('--------------------------------');
  console.log({axiosPayload});
  console.log('--------------------------------');

  try {
    const response = await axios(axiosPayload);
    return response.data;
  } catch (err: any) {
    console.log('errortype:', err);
    console.log(axios.isAxiosError(err));
    if (axios.isAxiosError(err) || err.response === undefined) {
      // payload.reduxDispatch(errors({message: err.message, value: true}));
      errorMessage(err.message);
    }
    if (err.response.data) {
      const {message, statuscode} = err.response.data;
      errorMessage(message, statuscode);

      console.log({message});
      console.log({statuscode});
      // payload.reduxDispatch(errors({message: message, value: true}));

      if (message == 'Unauthorized' || message === 'Token Missing') {
        await AsyncStorage.removeItem('userData');
        payload.navigation.replace('Stack');
      }
    }
  }
};

export const createFormData = (obj: any) => {
  const formData = new FormData();
  for (const key in obj) {
    if (!!obj[key]) {
      const dKey = obj[key];
      formData.append(key, dKey);
    }
  }

  return formData;
};

export const setColor = (status: any) => {
  switch (status) {
    case OrderStatus.ACTIVE:
      return {
        col: '#02A7FD',
        bg: '#E6F6FF',
      };
    case OrderStatus.PENDING:
      return {
        col: '#FAC245',
        bg: '#FFF9EC',
      };
    case OrderStatus.DELIVERED:
      return {
        col: '#00D100',
        bg: '#C3FFC3',
      };
    case OrderStatus.REJECTED:
      return {
        col: '#BF181D',
        bg: '#FFCECF',
      };
    default:
      return {
        col: 'black',
        bg: 'white',
      };
  }
};





