import { 
	ADD_RATING_REQUEST, ADD_RATING_SUCCESS, ADD_RATING_ERROR,
	DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, DELETE_RATING_ERROR 
} from '../ratingConstants';

export function ratingReducer(action) {

	switch (action.type) {

		case ADD_RATING_REQUEST:
			return {
				error: {
					active: false,
					message: ''
				}
			}

		case ADD_RATING_SUCCESS:
			return {
				error: {
					active: false,
					message: ''
				}
			}

		case ADD_RATING_ERROR:
			return {
				error: {
					active: true,
					message: action.payload.error
				}
			}

		case DELETE_RATING_REQUEST:
			return {
				error: {
					active: false,
					message: ''
				}
			}

		case DELETE_RATING_SUCCESS:
			return {
				error: {
					active: false,
					message: ''
				}
			}

		case DELETE_RATING_ERROR:
			return {
				error: {
					active: true,
					message: action.payload.error
				}
			}
	}
}