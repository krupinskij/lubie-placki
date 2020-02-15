import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_ERROR,
  
  LOGOUT_REQUEST,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from './constants/userConstants';

import {
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_ERROR,

  ADD_INGREDIENTS_REQUEST,
  ADD_INGREDIENTS_SUCCESS,
  ADD_INGREDIENTS_ERROR,

  ADD_DIRECTIONS_REQUEST,
  ADD_DIRECTIONS_SUCCESS,
  ADD_DIRECTIONS_ERROR,

  ADD_HINTS_REQUEST,
  ADD_HINTS_SUCCESS,
  ADD_HINTS_ERROR,

  ADD_PHOTO_REQUEST,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_ERROR,

  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_ERROR,

  UPDATE_INGREDIENTS_REQUEST,
  UPDATE_INGREDIENTS_SUCCESS,
  UPDATE_INGREDIENTS_ERROR,

  UPDATE_DIRECTIONS_REQUEST,
  UPDATE_DIRECTIONS_SUCCESS,
  UPDATE_DIRECTIONS_ERROR,

  UPDATE_HINTS_REQUEST,
  UPDATE_HINTS_SUCCESS,
  UPDATE_HINTS_ERROR,

  UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_ERROR
} from './constants/recipeConstants';

export const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: {
    active: false,
    message: ""
  },
  error: {
    active: false,
    message: ""
  }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_REQUEST: {
      return {
        ...state, 
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
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
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

    case LOGIN_ERROR: {
      return {
        ...state,
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
        ...state,
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
        ...state, 
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
        ...state,
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
        ...state,
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

    case ADD_RECIPE_REQUEST:  { 
      return {
        ...state,
        loading: {
          active: true,
          message: "Trwa dodawanie przepisu..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_RECIPE_SUCCESS:  { 
      return {
        ...state,
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

    case ADD_RECIPE_ERROR:    {
      return {
        ...state,
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

    case ADD_INGREDIENTS_REQUEST:  { 
      return {
        ...state,
        loading: {
          active: true,
          message: "Trwa dodawanie składników..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_INGREDIENTS_SUCCESS:  { 
      return {
        ...state,
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

    case ADD_INGREDIENTS_ERROR:    { 
      return {
        ...state,
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

    case ADD_DIRECTIONS_REQUEST:  { 
      return {
        ...state,
        loading: {
          active: true,
          message: "Trwa dodawanie sposobu wykonania..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_DIRECTIONS_SUCCESS:  { 
      return {
        ...state,
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

    case ADD_DIRECTIONS_ERROR:    { 
      return {
        ...state,
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

    case ADD_HINTS_REQUEST:  { 
      return {
        ...state,
        loading: {
          active: true,
          message: "Trwa dodawanie wskazówek..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_HINTS_SUCCESS:  { 
      return {
        ...state,
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

    case ADD_HINTS_ERROR:    { 
      return {
        ...state,
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

    case ADD_PHOTO_REQUEST:  { 
      return {
        ...state,
        loading: {
          active: true,
          message: "Trwa dodawanie zdjęcia..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_PHOTO_SUCCESS:  { 
      return {
        ...state,
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

    case ADD_PHOTO_ERROR:    { 
      return {
        ...state,
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

    case UPDATE_RECIPE_REQUEST:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_RECIPE_SUCCESS:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      } 
    }

    case UPDATE_RECIPE_ERROR:    { 
      return {
        ...state,
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_INGREDIENTS_REQUEST:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_INGREDIENTS_SUCCESS:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      } 
    }

    case UPDATE_INGREDIENTS_ERROR:    { 
      return {
        ...state,
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_DIRECTIONS_REQUEST:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_DIRECTIONS_SUCCESS:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_DIRECTIONS_ERROR:    { 
      return {
        ...state,
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_HINTS_REQUEST:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_HINTS_SUCCESS:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_HINTS_ERROR:    { 
      return {
        ...state,
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_PHOTO_REQUEST:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_PHOTO_SUCCESS:  { 
      return {
        ...state,
        error: {
          active: false,
          message: ""
        }
      }
    }

    case UPDATE_PHOTO_ERROR:    { 
      return {
        ...state,
        error: {
          active: true,
          message: action.payload.error
        }
      } 
    }

    default:
        return state
  }
}

export default appReducer;