import { 
  UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_ERROR,
  UPDATE_INGREDIENTS_REQUEST, UPDATE_INGREDIENTS_SUCCESS, UPDATE_INGREDIENTS_ERROR,
  UPDATE_DIRECTIONS_REQUEST, UPDATE_DIRECTIONS_SUCCESS, UPDATE_DIRECTIONS_ERROR,
  UPDATE_HINTS_REQUEST, UPDATE_HINTS_SUCCESS, UPDATE_HINTS_ERROR,
  UPDATE_PHOTO_REQUEST, UPDATE_PHOTO_SUCCESS, UPDATE_PHOTO_ERROR 
} from './updateRecipeConstants';

export function updateRecipeReducer(action) {

  switch (action.type) {

    case UPDATE_RECIPE_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_RECIPE_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_RECIPE_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_INGREDIENTS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_INGREDIENTS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_INGREDIENTS_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_DIRECTIONS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_DIRECTIONS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_DIRECTIONS_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_HINTS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_HINTS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_HINTS_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case UPDATE_PHOTO_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_PHOTO_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case UPDATE_PHOTO_ERROR: {
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