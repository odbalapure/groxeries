import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

// const url = "http://localhost:5000/api/v1/auth/login";
const url = "https://ekart-express-api.herokuapp.com/api/v1/auth/login";

function Login() {
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });

  const emailRef = useRef();
  const passwordRef = useRef();

  /**
   * @desc    Method to login a user
   * @returns none
   */
  const loginUser = async () => {
    const userObj = { email: "", password: "" };
    userObj.email = emailRef.current.value;
    userObj.password = passwordRef.current.value;

    if (userObj.email === "" || userObj.password === "") {
      setWarning("Email and password cannot be empty!");
      return;
    }

    const loginDetails = await axios.post(`${url}`, userObj);

    const loggedInUserObj = {
      token: loginDetails.data.token,
      userName: loginDetails.data.user,
      isSeller: loginDetails.data.isSeller,
      cartId: loginDetails.data.cartId,
    };

    console.log("Logged in user: ", loggedInUserObj);

    localStorage.setItem("ekartToken", JSON.stringify(loggedInUserObj));
    navigateToProducts();
    window.location.reload(false);
  };

  return (
    <div className="container" style={{ marginTop: "8rem"}}>
      <form
        className="border border-primary"
        style={{
          margin: "2rem",
          border: "1px solid lightgray",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter an Email Id"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
        </div>
        {warning ? (
          <div className="alert alert-danger" role="alert">
            <div
              className="d-flex justify-content-center"
              style={{ margin: "2rem auto" }}
            >
              {warning}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            style={{ width: "80%" }}
            onClick={loginUser}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
