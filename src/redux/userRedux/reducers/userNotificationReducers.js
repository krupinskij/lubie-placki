import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, EDIT_SUCCESS, EDIT_AVATAR_SUCCESS, REGISTER_ERROR, LOGOUT_ERROR, EDIT_ERROR, EDIT_AVATAR_ERROR, REGISTER_DELETE, LOGIN_DELETE, LOGOUT_DELETE, EDIT_DELETE, EDIT_AVATAR_DELETE } from "../userConstants";


export function userNotificationReducers(action, notifications) {

    switch (action.type) {

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOGOUT_SUCCESS:
        case EDIT_SUCCESS:
        case EDIT_AVATAR_SUCCESS: {

            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }

        }

        case REGISTER_ERROR:
        case LOGIN_ERROR:
        case LOGOUT_ERROR:
        case EDIT_ERROR:
        case EDIT_AVATAR_ERROR: {

            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }

        }

        case REGISTER_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== REGISTER_SUCCESS && n.type !== REGISTER_ERROR)
            }
        }

        case LOGIN_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== LOGIN_SUCCESS && n.type !== LOGIN_ERROR)
            }
        }

        case LOGOUT_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== LOGOUT_SUCCESS && n.type !== LOGOUT_ERROR)
            }
        }

        case EDIT_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== EDIT_SUCCESS && n.type !== EDIT_ERROR)
            }
        }

        case EDIT_AVATAR_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== EDIT_AVATAR_SUCCESS && n.type !== EDIT_AVATAR_ERROR)
            }
        }

        default: {
            return {}
        }
    }
}