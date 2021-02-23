/* eslint-disable camelcase */
import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
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

export const googleAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/o/google-oauth2/?${formBody}`,
        config
      );

      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: GOOGLE_AUTH_FAIL,
      });
    }
  }
};

export const facebookAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/o/facebook/?${formBody}`,
        config
      );

      dispatch({
        type: FACEBOOK_AUTH_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: FACEBOOK_AUTH_FAIL,
      });
    }
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem('access') });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
          body,
          config,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
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

export const signup = (
  first_name,
  last_name,
  email,
  password,
  re_password
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/`,
      body,
      config
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const resetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const resetPasswordConfirm = (
  uid,
  token,
  new_password,
  re_new_password
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/reset_password_confirm/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
