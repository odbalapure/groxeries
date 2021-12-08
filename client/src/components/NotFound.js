import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ margin: "35vh auto" }}
    >
      <p className="fs-1 text-danger fw-bold">Route does not exist!</p>
      <Link to="/">
        <button className="btn btn-primary">Back To Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
