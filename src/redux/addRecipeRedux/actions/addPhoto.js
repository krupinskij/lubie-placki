import {
    ADD_PHOTO_REQUEST,
    ADD_PHOTO_SUCCESS,
    ADD_PHOTO_ERROR,

    ADD_RECIPE, 
    ADD_PHOTO_DELETE
} from '../addRecipeConstants';

export const addPhoto = (token, recipe_id, photo) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpeg',
                'securityTokenValue': token
            },
            body: photo
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status === 401 || resp.status === 403) {
                    throw new Error(resp.message);
                }

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(addSuccess(resp));
                return resp;
            })
            .catch(error => {
                dispatch(addError(error.message));
                return undefined;
            })
    }
}

export const deleteAddPhotoNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const addRequest = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_PHOTO_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_PHOTO_SUCCESS,
        payload: {
            success: 'Pomyślnie dodano zdjęcie'
        }
    };
}

const addError = error => {
    return {
        group: ADD_RECIPE,
        type: ADD_PHOTO_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_PHOTO_DELETE
    }
}