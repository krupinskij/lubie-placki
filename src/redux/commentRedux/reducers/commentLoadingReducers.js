import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR,
  UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR
} from "../commentConstants";


export function commentLoadingReducers(action, loading) {

  switch (loading.type) {

    case ADD_COMMENT_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa dodawanie komentarza...']
        }
      }
    }

    case ADD_COMMENT_SUCCESS:
    case ADD_COMMENT_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa dodawanie komentarza...')]
        }
      }
    }

    case UPDATE_COMMENT_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa edytowanie komentarza...']
        }
      }
    }

    case UPDATE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa edytowanie komentarza...')]
        }
      }
    }

    case DELETE_COMMENT_REQUEST: {
      return {
        loading: {
          active: true,
          messages: [...loading.messages, 'Trwa usuwanie komentarza...']
        }
      }
    }

    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_ERROR: {
      return {
        loading: {
          active: loading.messages.length > 1,
          messages: [...loading.messages.filter(m => m !== 'Trwa usuwanie komentarza...')]
        }
      }
    }

    default: {
      return {}
    }
  }
}