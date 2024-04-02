// authReducer.js

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    DELETE_ACCOUNT_REQUEST,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILURE,
    LOGOUT
  } from './types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case SIGNUP_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        console.log(action.payload)
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          error: null
        };
      case SIGNUP_REQUEST:
      case LOGIN_REQUEST:
      case UPDATE_PROFILE_REQUEST:
      case DELETE_ACCOUNT_REQUEST:
        return {
          ...state,
          loading: true
        };
      case SIGNUP_FAILURE:
      case LOGIN_FAILURE:
      case AUTH_ERROR:
      case UPDATE_PROFILE_FAILURE:
      case DELETE_ACCOUNT_FAILURE:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: payload
        };
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          user: payload,
          loading: false,
          error: null
        };
      case DELETE_ACCOUNT_SUCCESS:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  