import { UPDATE_RECIPE_SUCCESS, UPDATE_INGREDIENTS_SUCCESS, UPDATE_DIRECTIONS_SUCCESS, UPDATE_HINTS_SUCCESS, UPDATE_PHOTO_SUCCESS, UPDATE_RECIPE_ERROR, UPDATE_INGREDIENTS_ERROR, UPDATE_DIRECTIONS_ERROR, UPDATE_HINTS_ERROR, UPDATE_PHOTO_ERROR, UPDATE_RECIPE_DELETE, UPDATE_INGREDIENTS_DELETE, UPDATE_DIRECTIONS_DELETE, UPDATE_HINTS_DELETE, UPDATE_PHOTO_DELETE } from "../updateRecipeConstants";


export function updateRecipeNotificationReducers(action, notifications) {

    switch (action.type) {

        case UPDATE_RECIPE_SUCCESS:
        case UPDATE_INGREDIENTS_SUCCESS:
        case UPDATE_DIRECTIONS_SUCCESS:
        case UPDATE_HINTS_SUCCESS:
        case UPDATE_PHOTO_SUCCESS: {

            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }

        }

        case UPDATE_RECIPE_ERROR:
        case UPDATE_INGREDIENTS_ERROR:
        case UPDATE_DIRECTIONS_ERROR:
        case UPDATE_HINTS_ERROR:
        case UPDATE_PHOTO_ERROR: {

            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }
            
        }

        case UPDATE_RECIPE_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== UPDATE_RECIPE_SUCCESS && n.type !== UPDATE_RECIPE_ERROR)
            }
        }

        case UPDATE_INGREDIENTS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== UPDATE_INGREDIENTS_SUCCESS && n.type !== UPDATE_INGREDIENTS_ERROR)
            }
        }

        case UPDATE_DIRECTIONS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== UPDATE_DIRECTIONS_SUCCESS && n.type !== UPDATE_DIRECTIONS_ERROR)
            }
        }

        case UPDATE_HINTS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== UPDATE_HINTS_SUCCESS && n.type !== UPDATE_HINTS_ERROR)
            }
        }

        case UPDATE_PHOTO_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== UPDATE_PHOTO_SUCCESS && n.type !== UPDATE_PHOTO_ERROR)
            }
        }

        default: {
            return {}
        }
    }
}