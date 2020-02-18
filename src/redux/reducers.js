import { GET_RECIPES } from './getRecipesRedux/getRecipesConstants';
import { USER } from './userRedux/userConstants';
import { ADD_RECIPE } from './addRecipeRedux/addRecipeConstants';
import { UPDATE_RECIPE } from './updateRecipeRedux/updateRecipeConstants';
import { DELETE_RECIPE } from './deleteRecipeRedux/deleteRecipeConstants';
import { COMMENT } from './commentRedux/commentConstants';
import { RATING } from './ratingRedux/ratingConstants';

import { getRecipesReducer } from './getRecipesRedux/getRecipesReducer';
import { userReducer } from './userRedux/userReducer';
import { addRecipeReducer } from './addRecipeRedux/addRecipeReducer';
import { updateRecipeReducer } from './updateRecipeRedux/updateRecipeReducer';
import { deleteRecipeReducer } from './deleteRecipeRedux/deleteRecipeReducer';
import { commentReducer } from './commentRedux/commentReducer';
import { ratingReducer } from './ratingRedux/ratingReducer';

export const initialState = {
  token: JSON.parse(localStorage.getItem('lubie-placki-token')),
  loading: {
    active: false,
    message: ''
  },
  error: {
    active: false,
    message: ''
  }
};

const appReducer = (state = initialState, action) => {

  switch (action.group) {

    case GET_RECIPES:
      return { ...state, ...getRecipesReducer(action) }

    case USER: {
      return { ...state, ...userReducer(action) }
    }

    case ADD_RECIPE: {
      return { ...state, ...addRecipeReducer(action) }
    }

    case UPDATE_RECIPE: {
      return { ...state, ...updateRecipeReducer(action) }
    }

    case DELETE_RECIPE: {
      return { ...state, ...deleteRecipeReducer(action) }
    }

    case COMMENT: {
      return { ...state, ...commentReducer(action) }
    }

    case RATING: {
      return { ...state, ...ratingReducer(action) }
    }

    default:
      return state
  }
}

export default appReducer;