import firebase from 'firebase';
import {  AsyncStorage  } from 'react-native';

import {FB_LOGIN_SUCCESS} from './types';

export const facebookLogin = () => {
  return({
    type: FB_LOGIN_SUCCESS,
    payload: index
  });
};
