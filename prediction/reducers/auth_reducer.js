import { FB_LOGIN_SUCCESS  } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
};

export default function(state = INITIAL_STATE,action) {
  switch (action.type) {
    case FB_LOGIN_SUCCESS:
      return { ...state , loading: false  };
    default:
      return state;
  }
}
