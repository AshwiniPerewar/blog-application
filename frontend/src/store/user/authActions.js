// authActions.js

import axios from 'axios';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  LOGOUT
} from './types';
import { api } from '../../api';

// Signup Action
export const signup = (formData) => async dispatch => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const res = await axios.post(`${api}/users/signup`, formData);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data // token or user data
     });
    
     } catch (err) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: err.response.data.message // Error message
    });
  }
};

// Login Action
export const login = (formData,navigate) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await axios.post(`${api}/users/login`, formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data // token or user data
    });
    alert(res.data.message)
    navigate("/");
  } catch (err) {
    // console.log(err.response.data.message)
    dispatch({
      type: LOGIN_FAILURE,
      payload: err.response.data.message // Error message
    });
    return err.response.data.message
  }
};

// Logout Action
export const logout = (navigate) => async dispatch => {
  dispatch({ type: LOGOUT });
  navigate("/login")
};


// Update Profile Action
export const updateProfile = (formData, callback) => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const res = await axios.put('/api/profile', formData);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data // Updated user data
    });
    callback(); // Callback after successful profile update
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: err.response.data.message // Error message
    });
  }
};

// Delete Account Action
export const deleteAccount = () => async dispatch => {
  dispatch({ type: DELETE_ACCOUNT_REQUEST });

  try {
    await axios.delete('/api/profile');
    dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    // Redirect or show message after account deletion
  } catch (err) {
    dispatch({
      type: DELETE_ACCOUNT_FAILURE,
      payload: err.response.data.message // Error message
    });
  }
};
