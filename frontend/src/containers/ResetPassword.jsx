import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';

const ResetPassword = ({ resetPassword }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    resetPassword(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>Reset Password</h1>
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
        <button className="btn btn-primary" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { resetPassword })(ResetPassword);
