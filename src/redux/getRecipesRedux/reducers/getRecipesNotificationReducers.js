import { GET_RECIPES_SUCCESS, GET_RECIPES_ERROR, GET_RECIPES_DELETE } from "../getRecipesConstants";


export function getRecipesNotificationReducers(action, notifications) {

    switch(action.type) {

        case GET_RECIPES_SUCCESS: {

            const notification = {
                result: 'success',
                type: action.type,
                message: action.payload.success
            }

            return {
                notifications: [...notifications, notification]
            }
        }

        case GET_RECIPES_ERROR: {
            
            const notification = {
                result: 'error',
                type: action.type,
                message: action.payload.error
            }

            return {
                notifications: [...notifications, notification]
            }

        }

        case GET_RECIPES_DELETE: {
            return {
                notifications: notifications.filter(n => n.type !== GET_RECIPES_SUCCESS && n.type !== GET_RECIPES_ERROR)
            }
        }

        default: {
            return {}
        }
    }
}