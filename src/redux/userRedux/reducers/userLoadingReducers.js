import { 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR, 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, 
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR, 
  EDIT_REQUEST, EDIT_SUCCESS, EDIT_ERROR, 
  EDIT_AVATAR_REQUEST, EDIT_AVATAR_SUCCESS, EDIT_AVATAR_ERROR 
} from "../userConstants";


export function userLoadingReducers(action, loading) {

  switch (action.type) {

    case REGISTER_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa rejestrowanie nowego użytkownika...']
        }
      }
    }

    case REGISTER_SUCCESS:
    case REGISTER_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa rejestrowanie nowego użytkownika...')]
        }
      }
    }

    case LOGIN_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa logowanie...']
        }
      }
    }

    case LOGIN_SUCCESS:
    case LOGIN_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa logowanie...')]
        }
      }
    }

    case LOGOUT_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa wylogowywanie...']
        }
      }
    }

    case LOGOUT_SUCCESS:
    case LOGOUT_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa wylogowywanie...')]
        }
      }
    }

    case EDIT_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie danych użytkownika...']
        }
      }
    }

    case EDIT_SUCCESS:
    case EDIT_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie danych użytkownika...')]
        }
      }
    }

    case EDIT_AVATAR_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie zdjęcia użytkownika...']
        }
      }
    }

    case EDIT_AVATAR_SUCCESS:
    case EDIT_AVATAR_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie zdjęcia użytkownika...')]
        }
      }
    }

    default: {
      return {}
    }
    
  }
}