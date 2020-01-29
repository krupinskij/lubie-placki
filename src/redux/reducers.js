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

    case ADD_RECIPE_REQUEST:  { 
      return { ...state, error: null} 
    }

    case ADD_RECIPE_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case ADD_RECIPE_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case ADD_INGREDIENTS_REQUEST:  { 
      return { ...state, error: null} 
    }

    case ADD_INGREDIENTS_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case ADD_INGREDIENTS_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case ADD_DIRECTIONS_REQUEST:  { 
      return { ...state, error: null} 
    }

    case ADD_DIRECTIONS_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case ADD_DIRECTIONS_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case ADD_HINTS_REQUEST:  { 
      return { ...state, error: null} 
    }

    case ADD_HINTS_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case ADD_HINTS_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case ADD_PHOTO_REQUEST:  { 
      return { ...state, error: null} 
    }

    case ADD_PHOTO_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case ADD_PHOTO_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case UPDATE_RECIPE_REQUEST:  { 
      return { ...state, error: null} 
    }

    case UPDATE_RECIPE_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case UPDATE_RECIPE_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case UPDATE_INGREDIENTS_REQUEST:  { 
      return { ...state, error: null} 
    }

    case UPDATE_INGREDIENTS_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case UPDATE_INGREDIENTS_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case UPDATE_DIRECTIONS_REQUEST:  { 
      return { ...state, error: null} 
    }

    case UPDATE_DIRECTIONS_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case UPDATE_DIRECTIONS_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case UPDATE_HINTS_REQUEST:  { 
      return { ...state, error: null} 
    }

    case UPDATE_HINTS_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case UPDATE_HINTS_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    case UPDATE_PHOTO_REQUEST:  { 
      return { ...state, error: null} 
    }

    case UPDATE_PHOTO_SUCCESS:  { 
      return { ...state, error: null} 
    }

    case UPDATE_PHOTO_ERROR:    { 
      const { error } = action.payload;
      return { ...state, error} 
    }

    default:
        return state
  }
}

export default appReducer;