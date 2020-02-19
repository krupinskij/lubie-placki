import { 
    ADD_RECIPE_SUCCESS, ADD_RECIPE_ERROR, 
    ADD_INGREDIENTS_SUCCESS, ADD_INGREDIENTS_ERROR, 
    ADD_DIRECTIONS_SUCCESS, ADD_DIRECTIONS_ERROR, 
    ADD_HINTS_SUCCESS, ADD_HINTS_ERROR, 
    ADD_PHOTO_SUCCESS, ADD_PHOTO_ERROR, 
    ADD_TAGS_SUCCESS, ADD_TAGS_ERROR, ADD_RECIPE_DELETE, ADD_INGREDIENTS_DELETE, ADD_DIRECTIONS_DELETE, ADD_HINTS_DELETE, ADD_PHOTO_DELETE, ADD_TAGS_DELETE 
} from '../addRecipeConstants';


export function addRecipeNotificationReducers(action, notifications) {

    switch (action.type) {

        case ADD_RECIPE_SUCCESS:
        case ADD_INGREDIENTS_SUCCESS:
        case ADD_DIRECTIONS_SUCCESS:
        case ADD_HINTS_SUCCESS:
        case ADD_PHOTO_SUCCESS:
        case ADD_TAGS_SUCCESS: {

            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }
        }

        case ADD_RECIPE_ERROR:
        case ADD_INGREDIENTS_ERROR:
        case ADD_DIRECTIONS_ERROR:
        case ADD_HINTS_ERROR:
        case ADD_PHOTO_ERROR:
        case ADD_TAGS_ERROR: {

            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }
        }

        case ADD_RECIPE_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_RECIPE_SUCCESS && n.type !== ADD_RECIPE_ERROR)
            }
        }

        case ADD_INGREDIENTS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_INGREDIENTS_SUCCESS && n.type !== ADD_INGREDIENTS_ERROR)
            }
        }

        case ADD_DIRECTIONS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_DIRECTIONS_SUCCESS && n.type !== ADD_DIRECTIONS_ERROR)
            }
        }

        case ADD_HINTS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_HINTS_SUCCESS && n.type !== ADD_HINTS_ERROR)
            }
        }

        case ADD_PHOTO_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_PHOTO_SUCCESS && n.type !== ADD_PHOTO_ERROR)
            }
        }

        case ADD_TAGS_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== ADD_TAGS_SUCCESS && n.type !== ADD_TAGS_ERROR)
            }
        }

        default: {
            return {}
        }

    }
}