import {
    UPDATE_PHOTO_REQUEST,
    UPDATE_PHOTO_SUCCESS,
    UPDATE_PHOTO_ERROR,

    UPDATE_RECIPE, 
    UPDATE_PHOTO_DELETE
} from '../updateRecipeConstants';

export const updatePhoto = (token, recipe_id, photo) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/photo', {
            method: 'PUT',
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

                dispatch(updateSuccess(resp));
                return resp;
            })
            .catch(error => {
                dispatch(updateError(error.message));
                return undefined;
            })
    }
}

export const deleteUpdatePhotoNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const updateRequest = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_PHOTO_REQUEST
    }
}

const updateSuccess = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_PHOTO_SUCCESS,
        payload: {
            success: 'Pomyślnie edytowano zdjęcie'
        }
    };
}

const updateError = error => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_PHOTO_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_PHOTO_DELETE
    }
  }