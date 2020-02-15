import { ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_ERROR } from './constants/addRecipeConstants';
import { ADD_INGREDIENTS_REQUEST, ADD_INGREDIENTS_SUCCESS, ADD_INGREDIENTS_ERROR } from './constants/addIngredientsConstants';
import { ADD_DIRECTIONS_REQUEST, ADD_DIRECTIONS_SUCCESS, ADD_DIRECTIONS_ERROR } from './constants/addDirectionsConstants';
import { ADD_HINTS_REQUEST, ADD_HINTS_SUCCESS, ADD_HINTS_ERROR } from './constants/addHintsConstants';
import { ADD_PHOTO_REQUEST, ADD_PHOTO_SUCCESS, ADD_PHOTO_ERROR } from './constants/addPhotoConstants';
import { ADD_TAGS_REQUEST, ADD_TAGS_SUCCESS, ADD_TAGS_ERROR } from './constants/addTagsConstants';

export function addRecipeReducer(action) {

  switch (action.type) {

    case ADD_RECIPE_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa dodawanie przepisu..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_RECIPE_SUCCESS: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_RECIPE_ERROR: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_INGREDIENTS_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa dodawanie składników..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_INGREDIENTS_SUCCESS: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_INGREDIENTS_ERROR: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_DIRECTIONS_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa dodawanie sposobu wykonania..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_DIRECTIONS_SUCCESS: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_DIRECTIONS_ERROR: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_HINTS_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa dodawanie wskazówek..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_HINTS_SUCCESS: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_HINTS_ERROR: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_PHOTO_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa dodawanie zdjęcia..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_PHOTO_SUCCESS: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_PHOTO_ERROR: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    case ADD_TAGS_REQUEST: {
      return {
        loading: {
          active: true,
          message: "Trwa dodawanie słów kluczowych..."
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_TAGS_SUCCESS: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: false,
          message: ""
        }
      }
    }

    case ADD_TAGS_ERROR: {
      return {
        loading: {
          active: false,
          message: ""
        },
        error: {
          active: true,
          message: action.payload.error
        }
      }
    }

    default:
      return {}
  }
}