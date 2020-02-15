import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants/loginConstants';
import { LOGOUT_REQUEST } from './constants/logoutConstants';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './constants/registerConstants';

export function userReducer(action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        user: null,
        loading: {
          active: true,
          message: "Trwa logowanie..."
        },
        error: {
          active: false,
          message: ""
        }
      }

    case LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }

      case LOGIN_ERROR: {
        return {
          user: null,
          loading: {
            active: false,
            message: ""
          },
          error: {
            active: true,
            message: action.payload.error
          }
        }
      }
  
      case LOGOUT_REQUEST: {
        return {
          user: null,
          loading: {
            active: false,
            message: ""
          },
          error: {
            active: false,
            message: ""
          }
        }
      }
  
      case REGISTER_REQUEST: {
        return {
          user: null, 
          loading: {
            active: true,
            message: "Trwa rejestracja..."
          },
          error: {
            active: false,
            message: ""
          }
        }
      }
  
      case REGISTER_SUCCESS: {
        return {
          user: action.payload.user,
          loading: {
            active: false,
            message: ""
          },
          error: {
            active: false,
            message: ""
          }
        }
      }
      
      case REGISTER_ERROR: {
        return {
          user: null,
          loading: {
            active: false,
            message: ""
          },
          error: {
            active: true,
            message: action.payload.error
          }
        }
      }
  }
}