import { 
  UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_ERROR, 
  UPDATE_INGREDIENTS_REQUEST, UPDATE_INGREDIENTS_SUCCESS, UPDATE_INGREDIENTS_ERROR, 
  UPDATE_DIRECTIONS_REQUEST, UPDATE_DIRECTIONS_SUCCESS, UPDATE_DIRECTIONS_ERROR,
  UPDATE_HINTS_REQUEST, UPDATE_HINTS_SUCCESS, UPDATE_HINTS_ERROR, 
  UPDATE_PHOTO_REQUEST, UPDATE_PHOTO_SUCCESS, UPDATE_PHOTO_ERROR 
} from "../updateRecipeConstants";


export function updateRecipeLoadingReducers(action, loading) {

  switch (action.type) {

    case UPDATE_RECIPE_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie przepisu...']
        }
      }
    }

    case UPDATE_RECIPE_SUCCESS:
    case UPDATE_RECIPE_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie przepisu...')]
        }
      }
    }

    case UPDATE_INGREDIENTS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie składników...']
        }
      }
    }

    case UPDATE_INGREDIENTS_SUCCESS:
    case UPDATE_INGREDIENTS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie składników...')]
        }
      }
    }

    case UPDATE_DIRECTIONS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie sposobu wykonania...']
        }
      }
    }

    case UPDATE_DIRECTIONS_SUCCESS:
    case UPDATE_DIRECTIONS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie sposobu wykonania...')]
        }
      }
    }

    case UPDATE_HINTS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie wskazówek...']
        }
      }
    }

    case UPDATE_HINTS_SUCCESS:
    case UPDATE_HINTS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie wskazówek...')]
        }
      }
    }

    case UPDATE_PHOTO_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie zdjęcia...']
        }
      }
    }

    case UPDATE_PHOTO_SUCCESS:
    case UPDATE_PHOTO_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie zdjęcia...')]
        }
      }
    }

    default: {
      return {}
    }
  }
}