import { 
    ADD_RATING_REQUEST, ADD_RATING_SUCCESS, ADD_RATING_ERROR 
} from "../ratingConstants";


export function ratingLoadingReducers(action, loading) {

    switch(action.type) {

        case ADD_RATING_REQUEST: {
            return {
                loading: {
                  active: true,
                  messages: [...loading.messages, 'Trwa dodawanie oceny...']
                }
              }
        }

        case ADD_RATING_SUCCESS:
        case ADD_RATING_ERROR: {
            return {
                loading: {
                  active: loading.messages.length > 1,
                  messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie oceny...')]
                }
              }
        }

        default: {
            return {}
        }
    }
}