import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { checkAuthenticated, loadUser } from '../actions/auth';

const Layout = ({ checkAuthenticated, loadUser, children }) => {
  useEffect(() => {
    checkAuthenticated();
    loadUser();
  }, [checkAuthenticated, loadUser]);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  loadUser,
})(Layout);
