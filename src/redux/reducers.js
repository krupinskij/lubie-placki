import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_ERROR,
  
  LOGOUT_REQUEST,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from './constants/userConstants';

export const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  logging: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_REQUEST: {
      return Object.assign({}, state, { user: null, logging: true, error: null })
    }
    case LOGIN_SUCCESS: {
      const { user } = action.payload;
      return Object.assign({}, state, { user, logging: false, error: false });
    }
    case LOGIN_ERROR: {
      const { error } = action.payload;
      return Object.assign({}, state, { logging: false, error })
    }

    case LOGOUT_REQUEST: {
      return Object.assign({}, state, { user: null, logging: false, error: null })
    }

    case REGISTER_REQUEST: {
      return Object.assign({}, state, { user: null, logging: true, error: null })
    }
    case REGISTER_SUCCESS: {
      const { user } = action.payload;
      return Object.assign({}, state, { user, logging: false, error: false });
    }
    case REGISTER_ERROR: {
      const { error } = action.payload;
      return Object.assign({}, state, { logging: false, error })
    }

    default:
        return state
  }
}

export default appReducer;