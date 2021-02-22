import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  // Is authenticated? Redirect to home

  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <p>Sign into your account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            placeholder="Email"
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
            placeholder="Password"
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p className="mt-3">
        Forgot your password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // is authenticated?
});

export default connect(null, { login })(Login);