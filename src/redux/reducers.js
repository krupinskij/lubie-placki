import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './userRedux/constants/loginConstants';
import { LOGOUT_REQUEST } from './userRedux/constants/logoutConstants';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './userRedux/constants/registerConstants';

import { ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_ERROR } from './addRecipeRedux/constants/addRecipeConstants';
import { ADD_INGREDIENTS_REQUEST, ADD_INGREDIENTS_SUCCESS, ADD_INGREDIENTS_ERROR } from './addRecipeRedux/constants/addIngredientsConstants';
import { ADD_DIRECTIONS_REQUEST, ADD_DIRECTIONS_SUCCESS, ADD_DIRECTIONS_ERROR } from './addRecipeRedux/constants/addDirectionsConstants';
import { ADD_HINTS_REQUEST, ADD_HINTS_SUCCESS, ADD_HINTS_ERROR } from './addRecipeRedux/constants/addHintsConstants';
import { ADD_PHOTO_REQUEST, ADD_PHOTO_SUCCESS, ADD_PHOTO_ERROR } from './addRecipeRedux/constants/addPhotoConstants';
import { ADD_TAGS_REQUEST, ADD_TAGS_SUCCESS, ADD_TAGS_ERROR } from './addRecipeRedux/constants/addTagsConstants';

import { UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_ERROR } from './updateRecipeRedux/constants/updateRecipeConstants';
import { UPDATE_INGREDIENTS_REQUEST, UPDATE_INGREDIENTS_SUCCESS, UPDATE_INGREDIENTS_ERROR } from './updateRecipeRedux/constants/updateIngredientsConstants';
import { UPDATE_DIRECTIONS_REQUEST, UPDATE_DIRECTIONS_SUCCESS, UPDATE_DIRECTIONS_ERROR } from './updateRecipeRedux/constants/updateDirectionsConstants';
import { UPDATE_HINTS_REQUEST, UPDATE_HINTS_SUCCESS, UPDATE_HINTS_ERROR } from './updateRecipeRedux/constants/updateHintsConstants';
import { UPDATE_PHOTO_REQUEST, UPDATE_PHOTO_SUCCESS, UPDATE_PHOTO_ERROR } from './updateRecipeRedux/constants/updatePhotoConstants';

import { userReducer } from './userRedux/userReducer';
import { addRecipeReducer } from './addRecipeRedux/addRecipeReducer';
import { updateRecipeReducer } from './updateRecipeRedux/updateRecipeReducer';

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

    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:

    case LOGOUT_REQUEST:

    case REGISTER_REQUEST:
    case REGISTER_SUCCESS:
    case REGISTER_ERROR: {
      return { ...state, ...userReducer(action) }
    }

    case ADD_RECIPE_REQUEST:
    case ADD_RECIPE_SUCCESS:
    case ADD_RECIPE_ERROR:

    case ADD_INGREDIENTS_REQUEST:
    case ADD_INGREDIENTS_SUCCESS:
    case ADD_INGREDIENTS_ERROR:

    case ADD_DIRECTIONS_REQUEST:
    case ADD_DIRECTIONS_SUCCESS:
    case ADD_DIRECTIONS_ERROR:

    case ADD_HINTS_REQUEST:
    case ADD_HINTS_SUCCESS:
    case ADD_HINTS_ERROR:

    case ADD_PHOTO_REQUEST:
    case ADD_PHOTO_SUCCESS:
    case ADD_PHOTO_ERROR:

    case ADD_TAGS_REQUEST:
    case ADD_TAGS_SUCCESS:
    case ADD_TAGS_ERROR: {
      return { ...state, ...addRecipeReducer(action) }
    }

    case UPDATE_RECIPE_REQUEST:
    case UPDATE_RECIPE_SUCCESS:
    case UPDATE_RECIPE_ERROR:

    case UPDATE_INGREDIENTS_REQUEST:
    case UPDATE_INGREDIENTS_SUCCESS:
    case UPDATE_INGREDIENTS_ERROR:

    case UPDATE_DIRECTIONS_REQUEST:
    case UPDATE_DIRECTIONS_SUCCESS:
    case UPDATE_DIRECTIONS_ERROR:

    case UPDATE_HINTS_REQUEST:
    case UPDATE_HINTS_SUCCESS:
    case UPDATE_HINTS_ERROR:

    case UPDATE_PHOTO_REQUEST:
    case UPDATE_PHOTO_SUCCESS:
    case UPDATE_PHOTO_ERROR: {
      return { ...state, ...updateRecipeReducer(action) }
    }

    default:
      return state
  }
}

export default appReducer;