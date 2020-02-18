import { 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR,
  UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_ERROR 
} from '../commentConstants';

export function commentReducer(action) {

  switch (action.type) {

    case ADD_COMMENT_REQUEST:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case ADD_COMMENT_SUCCESS:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case ADD_COMMENT_ERROR:
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }

    case DELETE_COMMENT_REQUEST:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case DELETE_COMMENT_SUCCESS:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case DELETE_COMMENT_ERROR:
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }

    case UPDATE_COMMENT_REQUEST:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case UPDATE_COMMENT_SUCCESS:
      return {
        error: {
          active: false,
          message: ''
        }
      }

    case UPDATE_COMMENT_ERROR:
      return {
        error: {
          active: true,
          message: action.payload.error
        }
      }

    default:
      return {}

  }
}