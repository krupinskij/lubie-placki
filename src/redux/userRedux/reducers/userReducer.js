import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR 
} from '../userConstants';

export function userReducer(action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        token: null,
        error: {
          active: false,
          message: ''
        }
      }

    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        error: {
          active: false,
          message: ''
        }
      }

      case LOGIN_ERROR: {
        return {
          token: null,
          error: {
            active: true,
            message: action.payload.error
          }
        }
      }
  
      case LOGOUT_REQUEST: {
        return {
          error: {
            active: false,
            message: ''
          }
        }
      }

      case LOGOUT_SUCCESS: {
        return {
          token: null,
          error: {
            active: false,
            message: ''
          }
        }
      }

      case LOGOUT_ERROR: {
        return {
          error: {
            active: true,
            message: action.payload.error
          }
        }
      }
  
      case REGISTER_REQUEST: {
        return {
          token: null,
          error: {
            active: false,
            message: ''
          }
        }
      }
  
      case REGISTER_SUCCESS: {
        return {
          token: action.payload.token,
          error: {
            active: false,
            message: ''
          }
        }
      }
      
      case REGISTER_ERROR: {
        return {
          token: null,
          error: {
            active: true,
            message: action.payload.error
          }
        }
      }

      default:
        return {}
  }
}