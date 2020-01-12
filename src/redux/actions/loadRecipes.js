import {
    RECIPES_LOADED,
    RECIPES_LOADING,
    RECIPES_LOADING_ERROR
} from '../constants';

export const loadRecipes = (type) => {
    return dispatch => {
        dispatch(recipesLoading())
        return fetch('http://localhost:3004/recipes' + (type ? `?type=${type}` : ''))
            .then(recipes => recipes.json())
            .then(recipes => dispatch(recipesLoaded(recipes)))
            .catch(error => dispatch(recipesLoadingError(error)))
    }
}

const recipesLoading = () => {
    return {
        type: RECIPES_LOADING
    }
}

const recipesLoaded = recipes => {
    return {
        type: RECIPES_LOADED,
        payload: {
            recipes
        }
    };
}

const recipesLoadingError = error => {
    return {
        type: RECIPES_LOADING_ERROR,
        payload: {
            error
        }
    }
}