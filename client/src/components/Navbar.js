import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../context";

function Navbar() {
  // Update the cart count
  const { cartCount } = useGlobalContext();

  let isUserLoggedIn = false;
  let isSeller = false;
  const localStorageObj = localStorage.getItem("ekartToken");

  const userObj = JSON.parse(localStorageObj);

  if (localStorageObj !== null) {
    isUserLoggedIn = true;
    isSeller = userObj.isSeller;
  }

  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });

  /* Function to logout user */
  const logoutUser = () => {
    console.log("Logout user");
    localStorage.removeItem("ekartToken");
    navigateToProducts();
    window.location.reload(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ position: "fixed", width: "98.75vw", top: "0", zIndex: "100" }}
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fs-2"
          style={{ color: "goldenrod", boxSizing: "border-box" }}
        >
          GroXeries
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav d-flex justify-content-evenly"
            style={{ margin: "0 auto" }}
          >
            <li className="nav-item">
              <Link to="/" className="navbar-brand nav-link">
                Home
              </Link>
            </li>
            {isUserLoggedIn && isSeller ? (
              <li className="nav-item">
                <Link to="/products/add" className="navbar-brand nav-link">
                  Add Product
                </Link>
              </li>
            ) : null}
            {isUserLoggedIn && !isSeller ? (
              <li className="nav-item">
                <Link to="/cart" className="navbar-brand nav-link">
                  Cart ({cartCount})
                </Link>
              </li>
            ) : null}
            {isUserLoggedIn && isSeller ? (
              <li className="nav-item">
                <Link to="/orders" className="navbar-brand nav-link">
                  Orders
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link to="/login" className="navbar-brand nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="navbar-brand nav-link">
                Register
              </Link>
            </li>
          </ul>
          <div className="d-flex flex-wrap justify-content-evenly">
            <div className="d-flex flex-wrap">
              <p
                className="navbar-brand nav-link"
                style={{ color: "#fff", margin: "auto" }}
              >
                {isUserLoggedIn
                  ? `Hello, ${userObj.userName.split(" ")[0]}!`
                  : ""}
              </p>
              {isUserLoggedIn ? (
                <button
                  className="btn btn btn-outline-danger"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
