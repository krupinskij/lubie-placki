import { DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_ERROR } from './constants/deleteRecipeConstants';

export function deleteRecipeReducer(action) {

  switch (action.type) {

    case DELETE_RECIPE_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa usuwanie przepisu..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case DELETE_RECIPE_SUCCESS: {
      return {
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

    case DELETE_RECIPE_ERROR: {
      return {
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

    default:
      return {}
  }
}