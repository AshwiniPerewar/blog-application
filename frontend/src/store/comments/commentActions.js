import axios from 'axios';
import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
  } from './commentActionTypes';

// Comment actions

// add comment
export const addComment = (postId, commentData) => async dispatch => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    try {
      const res = await axios.post(`/api/posts/${postId}/comments`, commentData);
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: { postId, comment: res.data }
      });
    } catch (err) {
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload: err.response.data.message
      });
    }
  };
  
  // Update Comment
  export const updateComment = (postId, commentId, updatedData) => async dispatch => {
    dispatch({ type: UPDATE_COMMENT_REQUEST });
    try {
      const res = await axios.put(`/api/posts/${postId}/comments/${commentId}`, updatedData);
      dispatch({
        type: UPDATE_COMMENT_SUCCESS,
        payload: { postId, commentId, updatedComment: res.data }
      });
    } catch (err) {
      dispatch({
        type: UPDATE_COMMENT_FAILURE,
        payload: err.response.data.message
      });
    }
  };
  
  
  // Delete Comment
  export const deleteComment = (postId, commentId) => async dispatch => {
      dispatch({ type: DELETE_COMMENT_REQUEST });
      try {
        await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
        dispatch({
          type: DELETE_COMMENT_SUCCESS,
          payload: { postId, commentId }
        });
      } catch (err) {
        dispatch({
          type: DELETE_COMMENT_FAILURE,
          payload: err.response.data.message
        });
      }
    };