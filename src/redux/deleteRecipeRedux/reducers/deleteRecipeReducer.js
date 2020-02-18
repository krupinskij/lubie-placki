import { 
  DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_ERROR 
} from '../deleteRecipeConstants';

export function deleteRecipeReducer(action) {

  switch (action.type) {

    case DELETE_RECIPE_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case DELETE_RECIPE_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case DELETE_RECIPE_ERROR: {
      return {
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