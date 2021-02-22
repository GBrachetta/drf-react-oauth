import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from './types';

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
