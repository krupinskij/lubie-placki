import { USER } from './userRedux/constants/userGroup';
import { ADD_RECIPE } from './addRecipeRedux/constants/addRecipeGroup';
import { UPDATE_RECIPE } from './updateRecipeRedux/constants/updateRecipeGroup';
import { DELETE_RECIPE } from './deleteRecipeRedux/constants/deleteRecipeGroup';
import { COMMENT } from './commentRedux/constants/commentGroup';

import { userReducer } from './userRedux/userReducer';
import { addRecipeReducer } from './addRecipeRedux/addRecipeReducer';
import { updateRecipeReducer } from './updateRecipeRedux/updateRecipeReducer';
import { deleteRecipeReducer } from './deleteRecipeRedux/deleteRecipeReducer';
import { commentReducer } from './commentRedux/commentReducer';

export const initialState = {
  token: JSON.parse(localStorage.getItem('lubie-placki-token')),
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

  switch (action.group) {

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

    default:
      return state
  }
}

export default appReducer;