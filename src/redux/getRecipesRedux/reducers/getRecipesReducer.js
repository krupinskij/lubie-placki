import { 
  GET_RECIPES_REQUEST, GET_RECIPES_SUCCESS, GET_RECIPES_ERROR 
} from '../getRecipesConstants';


export function getRecipesReducer(action) {

  switch (action.type) {

    case GET_RECIPES_REQUEST:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case GET_RECIPES_SUCCESS:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case GET_RECIPES_ERROR:
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }

    default:
      return {}
  }
}