import { DELETE_RECIPE_SUCCESS, DELETE_RECIPE_ERROR, DELETE_RECIPE_DELETE } from "../deleteRecipeConstants";


export function deleteRecipeNotificationReducers(action, notifications) {

    switch(action.type) {

        case DELETE_RECIPE_SUCCESS: {

            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }

        }

        case DELETE_RECIPE_ERROR: {

            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }

        }

        case DELETE_RECIPE_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== DELETE_RECIPE_SUCCESS && n.type !== DELETE_RECIPE_ERROR)
            }
        }

        default: {
            return {}
        }
        
    }
}