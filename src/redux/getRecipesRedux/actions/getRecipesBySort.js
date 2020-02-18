import { 
  GET_RECIPES_REQUEST, 
  GET_RECIPES_SUCCESS, 
  GET_RECIPES_ERROR,

  GET_RECIPES
} from '../getRecipesConstants';

export const getRecipesBySort = (type, page) => {
  return dispatch => {
    dispatch(getRequest())
    return fetch('http://localhost:3004/recipes/?sort=' + type + '&page=' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(resp => resp.json())
      .then(resp => {

        if (resp.status && resp.status !== 200) {
          throw new Error('Wystąpił nieznany błąd!');
        }

        dispatch(getSuccess());
        return resp;
      })
      .catch(error => {
        dispatch(getError(error.message))
        return [];
      })
  }
}

const getRequest = () => {
  return {
      group: GET_RECIPES,
      type: GET_RECIPES_REQUEST
  }
}

const getSuccess = () => {
  return {
      group: GET_RECIPES,
      type: GET_RECIPES_SUCCESS
  }
}

const getError = error => {
  return {
      group: GET_RECIPES,
      type: GET_RECIPES_ERROR,
      payload: {
          error
      }
  }
}