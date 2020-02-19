import { ADD_RATING_SUCCESS, DELETE_RATING_SUCCESS, ADD_RATING_ERROR, DELETE_RATING_ERROR, ADD_RATING_DELETE, DELETE_RATING_DELETE } from "../ratingConstants";


export function ratingNotificationReducers(action, notifications) {


    switch(action.type) {

        case ADD_RATING_SUCCESS:
        case DELETE_RATING_SUCCESS: {
            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }
        }

        case ADD_RATING_ERROR:
        case DELETE_RATING_ERROR: {

            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }
            
        }

        case ADD_RATING_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_RATING_SUCCESS && n.type !== ADD_RATING_ERROR)
            }
        }

        case DELETE_RATING_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== DELETE_RATING_SUCCESS && n.type !== DELETE_RATING_ERROR)
            }
        }

        default: {
            return {}
        }
    }
}