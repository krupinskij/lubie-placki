import {
  GET_RECIPES_REQUEST, GET_RECIPES_SUCCESS, GET_RECIPES_ERROR
} from "../getRecipesConstants";


export function getRecipesLoadingReducers(action, loading) {

  switch (action.type) {

    case GET_RECIPES_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa ładowanie przepisów...']
        }
      }
    }

    case GET_RECIPES_SUCCESS:
    case GET_RECIPES_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa ładowanie przepisów...')]
        }
      }
    }

    default: {
      return {}
    }
  }
}