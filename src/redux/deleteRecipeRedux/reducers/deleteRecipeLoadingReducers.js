import { 
  DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_ERROR 
} from "../deleteRecipeConstants";


export function deleteRecipeLoadingReducers(action, loading) {

  switch (action.type) {

    case DELETE_RECIPE_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa usuwanie przepisu...']
        }
      }
    }

    case DELETE_RECIPE_SUCCESS:
    case DELETE_RECIPE_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa usuwanie przepisu...')]
        }
      }
    }

    default: {
      return {}
    }
  }
}