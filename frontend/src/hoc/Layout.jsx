import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { checkAuthenticated, loadUser } from '../actions/auth';

const Layout = (props) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.loadUser();
  }, [props]);

  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
