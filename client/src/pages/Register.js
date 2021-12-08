import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

// const url = "http://localhost:5000/api/v1/auth/register";
const url = "https://ekart-express-api.herokuapp.com/api/v1/auth/register";

function Register() {
  const [warning, setWarning] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });

  /**
   * desc         Method to check if a user is a seller or not
   * @param {*}   event
   */
  const isUserSeller = (event) => {
    console.log("User type: " + event.target.value);
    if (event.target.value === "seller") {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  };

  /**
   * @desc     Method to register a user
   */
  const registerUser = async () => {
    const userObj = { name: "", email: "", password: "" };
    userObj.name = nameRef.current.value;
    userObj.email = emailRef.current.value;
    userObj.password = passwordRef.current.value;
    userObj.isSeller = isSeller;

    if (
      userObj.name === "" ||
      userObj.email === "" ||
      userObj.password === ""
    ) {
      setWarning("User name, email, password cannot be empty!");
      return;
    }

    try {
      await axios.post(`${url}`, userObj);
      navigateToProducts();
    } catch (error) {
      console.log("User registration failed, try again!");
    }
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter a Username"
            ref={nameRef}
          />
        </div>
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
        <div className="mb-3">
          <p>Are you a seller?</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="seller"
              onChange={isUserSeller}
              value="seller"
            />
            <label className="form-check-label" htmlFor="seller">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="customer"
              onChange={isUserSeller}
              value="customer"
            />
            <label className="form-check-label" htmlFor="customer">
              No
            </label>
          </div>
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
            className="btn btn-success"
            type="button"
            style={{ width: "80%" }}
            onClick={registerUser}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
