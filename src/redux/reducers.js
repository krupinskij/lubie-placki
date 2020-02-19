import { GET_RECIPES } from './getRecipesRedux/getRecipesConstants';
import { USER } from './userRedux/userConstants';
import { ADD_RECIPE } from './addRecipeRedux/addRecipeConstants';
import { UPDATE_RECIPE } from './updateRecipeRedux/updateRecipeConstants';
import { DELETE_RECIPE } from './deleteRecipeRedux/deleteRecipeConstants';
import { COMMENT } from './commentRedux/commentConstants';
import { RATING } from './ratingRedux/ratingConstants';

import { userTokenReducers } from './userRedux/reducers/userTokenReducer';

import { getRecipesLoadingReducers } from './getRecipesRedux/reducers/getRecipesLoadingReducers'
import { addRecipeLoadingReducers } from './addRecipeRedux/reducers/addRecipeLoadingReducers';
import { userLoadingReducers } from './userRedux/reducers/userLoadingReducers';
import { updateRecipeLoadingReducers } from './updateRecipeRedux/reducers/updateRecipeLoadingReducers';
import { deleteRecipeLoadingReducers } from './deleteRecipeRedux/reducers/deleteRecipeLoadingReducers';
import { commentLoadingReducers } from './commentRedux/reducers/commentLoadingReducers';
import { ratingLoadingReducers } from './ratingRedux/reducers/ratingLoadingReducers'

import { getRecipesNotificationReducers } from './getRecipesRedux/reducers/getRecipesNotificationReducers'
import { addRecipeNotificationReducers } from './addRecipeRedux/reducers/addRecipeNotificationReducers';
import { userNotificationReducers } from './userRedux/reducers/userNotificationReducers';
import { updateRecipeNotificationReducers } from './updateRecipeRedux/reducers/updateRecipeNotificationReducers';
import { deleteRecipeNotificationReducers } from './deleteRecipeRedux/reducers/deleteRecipeNotificationReducers';
import { commentNotificationReducers } from './commentRedux/reducers/commentNotificationReducers';
import { ratingNotificationReducers } from './ratingRedux/reducers/ratingNotificationReducers'

export const initialState = {
  token: JSON.parse(localStorage.getItem('lubie-placki-token')),
  loading: {
    active: false,
    messages: []
  },
  notifications: []
};

const appReducer = (state = initialState, action) => {

  switch (action.group) {

    case GET_RECIPES: {
      return { 
        ...state,
        ...getRecipesLoadingReducers(action, state.loading),
        ...getRecipesNotificationReducers(action, state.notifications)
      }
    }

    case USER: {
      return { 
        ...state, 
        ...userTokenReducers(action), 
        ...userLoadingReducers(action, state.loading), 
        ...userNotificationReducers(action, state.notifications) 
      }
    }

    case ADD_RECIPE: {
      return { 
        ...state,
        ...addRecipeLoadingReducers(action, state.loading), 
        ...addRecipeNotificationReducers(action, state.notifications) 
      }
    }

    case UPDATE_RECIPE: {
      return { 
        ...state,
        ...updateRecipeLoadingReducers(action, state.loading),
        ...updateRecipeNotificationReducers(action, state.notifications)
      }
    }

    case DELETE_RECIPE: {
      return { 
        ...state,
        ...deleteRecipeLoadingReducers(action, state.loading),
        ...deleteRecipeNotificationReducers(action, state.notifications)
      }
    }

    case COMMENT: {
      return { 
        ...state,
        ...commentLoadingReducers(action, state.loading),
        ...commentNotificationReducers(action, state.notifications)
      }
    }

    case RATING: {
      return { 
        ...state,
        ...ratingLoadingReducers(action, state.loading),
        ...ratingNotificationReducers(action, state.notifications)
      }
    }

    default:
      return state
  }
}

export default appReducer;