// postActions.js
import axios from 'axios';
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
} from './postActionTypes';
import { api } from '../../api';

// Post actions
export const fetchPosts = (sortBy,category) => async dispatch => {
  console.log(sortBy,category)
  dispatch({ type: FETCH_POSTS_REQUEST });
  try {
    let res = await axios.get(sortBy?`${api}/posts?category=${category}&sortBy=${sortBy}`:`${api}/posts`);
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: res.data.posts
    });
  } catch (err) {
    dispatch({
      type: FETCH_POSTS_FAILURE,
      payload: err.response.data.message
    });
  }
};

// fetch single post 
// Post actions
export const fetchPost = (postId) => async dispatch => {
  dispatch({ type: FETCH_POST_REQUEST });
  try {
    const res = await axios.get(`${api}/posts/${postId}`);
    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: res.data.post
    });
    // console.log(res.data.post)
   } catch (err) {
    dispatch({
      type: FETCH_POST_FAILURE,
      payload: err.response.data.message
    });
  }
};

// create post
export const createPost = postData => async dispatch => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const res = await axios.post(`${api}/posts`, postData);
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_POST_FAILURE,
      payload: err.response.data.message
    });
  }
};

export const updatePost = (postId, updatedData, navigate) => async dispatch => {
  const token = localStorage.getItem("token");
  console.log(updatedData)
  dispatch({ type: UPDATE_POST_REQUEST });
  try {
    const res = await axios.patch(`${api}/posts/${postId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        }
    });
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: res.data.posts
    });
    console.log(res.data)
    navigate(`/post/${postId}`)
  } catch (err) {
    alert(err.response.data.message)
    dispatch({
      type: UPDATE_POST_FAILURE,
      payload: err.response.data.message
    });
  }
};

export const deletePost = (postId,navigate) => async dispatch => {
  dispatch({ type: DELETE_POST_REQUEST });
  try {
    const res = await axios.delete(`${api}/posts/${postId}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId
    });
    alert(res.data.message)
    navigate("/posts")
  } catch (err) {
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: err.response.data.message
    });
  }
};

