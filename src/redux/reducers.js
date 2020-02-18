import { GET_RECIPES } from './getRecipesRedux/getRecipesConstants';
import { USER } from './userRedux/userConstants';
import { ADD_RECIPE } from './addRecipeRedux/addRecipeConstants';
import { UPDATE_RECIPE } from './updateRecipeRedux/updateRecipeConstants';
import { DELETE_RECIPE } from './deleteRecipeRedux/deleteRecipeConstants';
import { COMMENT } from './commentRedux/commentConstants';
import { RATING } from './ratingRedux/ratingConstants';

import { getRecipesReducer } from './getRecipesRedux/reducers/getRecipesReducer';
import { userReducer } from './userRedux/reducers/userReducer';
import { addRecipeReducer } from './addRecipeRedux/reducers/addRecipeReducer';
import { updateRecipeReducer } from './updateRecipeRedux/reducers/updateRecipeReducer';
import { deleteRecipeReducer } from './deleteRecipeRedux/reducers/deleteRecipeReducer';
import { commentReducer } from './commentRedux/reducers/commentReducer';
import { ratingReducer } from './ratingRedux/reducers/ratingReducer';

import { getRecipesLoadingReducers } from './getRecipesRedux/reducers/getRecipesLoadingReducers'
import { addRecipeLoadingReducers } from './addRecipeRedux/reducers/addRecipeLoadingReducers';
import { userLoadingReducers } from './userRedux/reducers/userLoadingReducers';
import { updateRecipeLoadingReducers } from './updateRecipeRedux/reducers/updateRecipeLoadingReducers';
import { deleteRecipeLoadingReducers } from './deleteRecipeRedux/reducers/deleteRecipeLoadingReducers';
import { commentLoadingReducers } from './commentRedux/reducers/commentLoadingReducers';
import { ratingLoadingReducers } from './ratingRedux/reducers/ratingLoadingReducers'

export const initialState = {
  token: JSON.parse(localStorage.getItem('lubie-placki-token')),
  loading: {
    active: false,
    messages: []
  },
  messages: [],
  error: {
    active: false,
    message: ''
  }
};

const appReducer = (state = initialState, action) => {

  switch (action.group) {

    case GET_RECIPES: {
      return { ...state, ...getRecipesReducer(action), ...getRecipesLoadingReducers(action, state.loading) }
    }

    case USER: {
      return { ...state, ...userReducer(action), ...userLoadingReducers(action, state.loading) }
    }

    case ADD_RECIPE: {
      return { ...state, ...addRecipeReducer(action),  ...addRecipeLoadingReducers(action, state.loading) }
    }

    case UPDATE_RECIPE: {
      return { ...state, ...updateRecipeReducer(action), ...updateRecipeLoadingReducers(action, state.loading) }
    }

    case DELETE_RECIPE: {
      return { ...state, ...deleteRecipeReducer(action), ...deleteRecipeLoadingReducers(action, state.loading) }
    }

    case COMMENT: {
      return { ...state, ...commentReducer(action), ...commentLoadingReducers(action, state.loading) }
    }

    case RATING: {
      return { ...state, ...ratingReducer(action), ...ratingLoadingReducers(action, state.loading) }
    }

    default:
      return state
  }
}

export default appReducer;