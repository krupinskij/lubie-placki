import { 
  GET_RECIPES_REQUEST, GET_RECIPES_SUCCESS, GET_RECIPES_ERROR 
} from './getRecipesConstants';


export function getRecipesReducer(action) {

  switch (action.type) {

    case GET_RECIPES_REQUEST:
      return {
        loading: {
          active: true,
          message: 'Trwa ładowanie przepisów'
        },
        error: {
          active: false,
          message: ''
        }
      }

    case GET_RECIPES_SUCCESS:
      return {
        loading: {
          active: false,
          message: ''
        },
        error: {
          active: false,
          message: ''
        }
      }

    case GET_RECIPES_ERROR:
      return {
        loading: {
          active: false,
          message: ''
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }

    default:
      return {}
  }
}