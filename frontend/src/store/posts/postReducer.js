import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "./postActionTypes";

const initialState = {
  posts: [],
  post:null,
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case FETCH_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
      case FETCH_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
      }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts,
        loading: false,
      };
    case FETCH_POSTS_FAILURE:
    case FETCH_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case CREATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
