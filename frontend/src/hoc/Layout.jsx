import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import {
  checkAuthenticated,
  loadUser,
  googleAuthenticate,
} from '../actions/auth';
import queryString from 'query-string';

const Layout = (props) => {
  let location = useLocation();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    console.log('State', state);
    console.log('Code', code);

    if (state && code) {
      props.googleAuthenticate(state, code);
    } else {
      props.checkAuthenticated();
      props.loadUser();
    }
  }, [props, location]);

  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  loadUser,
  googleAuthenticate,
})(Layout);
