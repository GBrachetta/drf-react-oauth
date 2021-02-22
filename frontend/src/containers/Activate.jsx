import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);

  const verifyAccount = (e) => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <div
        className="dflex flex-column justify-content-center align-items-center"
        style={{ marginTop: '200px' }}
      >
        <h1>Verify your Account</h1>
        <button
          type="button"
          onClick={verifyAccount}
          className="btn btn-outline-primary"
          style={{ marginTop: '50px' }}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
