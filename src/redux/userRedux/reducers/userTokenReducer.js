import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR 
} from '../userConstants';

export function userTokenReducers(action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        token: null
      }

    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
      }

      case LOGIN_ERROR: {
        return {
          token: null
        }
      }

      case LOGOUT_SUCCESS: {
        return {
          token: null
        }
      }
  
      case REGISTER_REQUEST: {
        return {
          token: null
        }
      }
  
      case REGISTER_SUCCESS: {
        return {
          token: action.payload.token
        }
      }
      
      case REGISTER_ERROR: {
        return {
          token: null
        }
      }

      default:
        return {}
  }
}