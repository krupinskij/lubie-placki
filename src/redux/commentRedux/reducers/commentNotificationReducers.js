import { ADD_COMMENT_SUCCESS, UPDATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, ADD_COMMENT_ERROR, UPDATE_COMMENT_ERROR, DELETE_COMMENT_ERROR, ADD_COMMENT_DELETE, UPDATE_COMMENT_DELETE, DELETE_COMMENT_DELETE } from "../commentConstants";


export function commentNotificationReducers(action, notifications) {

    switch (action.type) {

        case ADD_COMMENT_SUCCESS:
        case UPDATE_COMMENT_SUCCESS:
        case DELETE_COMMENT_SUCCESS: {
            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }
        }

        case ADD_COMMENT_ERROR:
        case UPDATE_COMMENT_ERROR:
        case DELETE_COMMENT_ERROR: {
            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }
        }

        case ADD_COMMENT_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_COMMENT_SUCCESS && n.type !== ADD_COMMENT_ERROR)
            }
        }

        case UPDATE_COMMENT_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== UPDATE_COMMENT_SUCCESS && n.type !== UPDATE_COMMENT_ERROR)
            }
        }

        case DELETE_COMMENT_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== DELETE_COMMENT_SUCCESS && n.type !== DELETE_COMMENT_ERROR)
            }
        }

        default: {
            return {}
        }
    }
}