import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container">
    <div className="jumbotron mt-5">
      <h1 className="display-4">Welcome to Auth System!</h1>
      <p className="lead">An authentication system.</p>
      <p className="lead">Production. Ready.</p>
      <hr className="my-4" />
      <p>Click Login to start</p>
      <Link className="btn btn-primary btn-lg" to="/login" role="button">
        Login
      </Link>
    </div>
  </div>
);

export default Home;
