/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <p>Create your account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            placeholder="Name*"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            placeholder="Email*"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            placeholder="Password*"
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="re_password"
            className="form-control"
            value={re_password}
            placeholder="Repeat Password*"
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </form>
      <p className="mt-3">
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
