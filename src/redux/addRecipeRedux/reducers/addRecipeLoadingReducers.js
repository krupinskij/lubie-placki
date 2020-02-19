import {
  ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_ERROR,
  ADD_INGREDIENTS_REQUEST, ADD_INGREDIENTS_SUCCESS, ADD_INGREDIENTS_ERROR,
  ADD_DIRECTIONS_REQUEST, ADD_DIRECTIONS_SUCCESS, ADD_DIRECTIONS_ERROR,
  ADD_HINTS_REQUEST, ADD_HINTS_SUCCESS, ADD_HINTS_ERROR,
  ADD_PHOTO_REQUEST, ADD_PHOTO_SUCCESS, ADD_PHOTO_ERROR,
  ADD_TAGS_REQUEST, ADD_TAGS_SUCCESS, ADD_TAGS_ERROR
} from '../addRecipeConstants';



export function addRecipeLoadingReducers(action, loading) {

  switch (action.type) {

    case ADD_RECIPE_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie przepisu...']
        }
      }
    }

    case ADD_RECIPE_SUCCESS:
    case ADD_RECIPE_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie przepisu...')]
        }
      }
    }

    case ADD_INGREDIENTS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie składników...']
        }
      }
    }

    case ADD_INGREDIENTS_SUCCESS:
    case ADD_INGREDIENTS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie składników...')]
        }
      }
    }

    case ADD_DIRECTIONS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie sposobu wykonania...']
        }
      }
    }

    case ADD_DIRECTIONS_SUCCESS:
    case ADD_DIRECTIONS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie sposobu wykonania...')]
        }
      }
    }

    case ADD_HINTS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie wskazówek...']
        }
      }
    }

    case ADD_HINTS_SUCCESS:
    case ADD_HINTS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie wskazówek...')]
        }
      }
    }

    case ADD_PHOTO_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie zdjęcia...']
        }
      }
    }

    case ADD_PHOTO_SUCCESS:
    case ADD_PHOTO_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie zdjęcia...')]
        }
      }
    }

    case ADD_TAGS_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie słów kluczowych...']
        }
      }
    }

    case ADD_TAGS_SUCCESS:
    case ADD_TAGS_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie słów kluczowych...')]
        }
      }
    }

    default: {
      return {}
    }
  }
}