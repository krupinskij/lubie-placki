import { 
	ADD_RATING_REQUEST, ADD_RATING_SUCCESS, ADD_RATING_ERROR,
	DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, DELETE_RATING_ERROR 
} from './ratingConstants';

export function ratingReducer(action) {

	switch (action.type) {

		case ADD_RATING_REQUEST:
			return {
				loading: {
					active: true,
					message: 'Trwa dodawanie oceny...'
				},
				error: {
					active: false,
					message: ''
				}
			}

		case ADD_RATING_SUCCESS:
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

		case ADD_RATING_ERROR:
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

		case DELETE_RATING_REQUEST:
			return {
				loading: {
					active: true,
					message: 'Trwa usuwanie oceny...'
				},
				error: {
					active: false,
					message: ''
				}
			}

		case DELETE_RATING_SUCCESS:
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

		case DELETE_RATING_ERROR:
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
	}
}