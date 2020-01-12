import { 
  USER_LOGGED, 
  USER_LOGGING, 
  USER_LOGGING_ERROR
} from './constants/loginConstants';

import { 
  USER_LOGOUT 
} from './constants/logoutConstants';

export const initialState = {
  user: null,
  logging: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_LOGGING: {
      return Object.assign({}, state, { user: null, logging: true, error: null })
    }
    case USER_LOGGED: {
      const { user } = action.payload;
      return Object.assign({}, state, { user, logging: false, error: false });
    }
    case USER_LOGGING_ERROR: {
      const { error } = action.payload;
      return Object.assign({}, state, { logging: false, error })
    }

    case USER_LOGOUT: {
      return Object.assign({}, state, { user: null, logging: false, error: null })
    }

    default:
        return state
  }
}

export default appReducer;