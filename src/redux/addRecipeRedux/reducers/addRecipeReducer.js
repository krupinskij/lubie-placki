import { 
  ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_ERROR,
  ADD_INGREDIENTS_REQUEST, ADD_INGREDIENTS_SUCCESS, ADD_INGREDIENTS_ERROR,
  ADD_DIRECTIONS_REQUEST, ADD_DIRECTIONS_SUCCESS, ADD_DIRECTIONS_ERROR,
  ADD_HINTS_REQUEST, ADD_HINTS_SUCCESS, ADD_HINTS_ERROR,
  ADD_PHOTO_REQUEST, ADD_PHOTO_SUCCESS, ADD_PHOTO_ERROR,
  ADD_TAGS_REQUEST, ADD_TAGS_SUCCESS, ADD_TAGS_ERROR 
} from '../addRecipeConstants';

export function addRecipeReducer(action) {

  switch (action.type) {

    case ADD_RECIPE_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_RECIPE_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_RECIPE_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_INGREDIENTS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_INGREDIENTS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_INGREDIENTS_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_DIRECTIONS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_DIRECTIONS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_DIRECTIONS_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_HINTS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_HINTS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_HINTS_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_PHOTO_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_PHOTO_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_PHOTO_ERROR: {
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_TAGS_REQUEST: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_TAGS_SUCCESS: {
      return {
        error: {
          active: false,
          message: ''
        }
      }
    }

    case ADD_TAGS_ERROR: {
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