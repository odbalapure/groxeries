import { useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";

// const url = "http://localhost:5000/api/v1/orders";
const url = "https://ekart-express-api.herokuapp.com/api/v1/orders";

function Checkout() {
  const { setCartCount, fetchCartItems } = useGlobalContext();

  const location = useLocation();
  let params = location.hash;

  const totalAmount = parseFloat(params.split("=")[1]).toFixed(2);
  const deliveryCharges = 50;

  const nameRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();
  const landMarkRef = useRef();

  const [warning, setWarning] = useState("");
  const [isOrderPlaced, setOrderPlaced] = useState(false);

  /**
   * @desc    Function to place an order
   */
  const placeOrder = async () => {
    const orderObj = {
      name: "",
      mobile: "",
      address: "",
      pincode: "",
      landMark: "",
      totalAmount: parseFloat(totalAmount) + parseFloat(deliveryCharges),
      orderDetails: [],
    };
    orderObj.name = nameRef.current.value;
    orderObj.mobile = mobileRef.current.value;
    orderObj.address = addressRef.current.value;
    orderObj.pincode = pincodeRef.current.value;
    orderObj.landMark = landMarkRef.current.value;
    orderObj.orderDetails = location.state;

    if (
      orderObj.name === "" ||
      orderObj.mobile === "" ||
      orderObj.address === "" ||
      orderObj.pincode === ""
    ) {
      setWarning("All the fields except Landmark are mandatory!");
      return;
    }

    await axios.post(`${url}`, orderObj, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
      },
      params: {
        cartId: JSON.parse(localStorage.getItem("ekartToken")).cartId,
      },
    });

    setOrderPlaced(true);
    setCartCount(0);
    fetchCartItems();
  };

  return (
    <div className="d-flex flex-wrap justify-content-around" style={{ marginTop: "5.5rem"}}>
      <form
        className="border border-primary"
        style={{
          margin: "2rem",
          border: "1px solid lightgray",
          padding: "2rem",
          borderRadius: "1rem",
          width: "30rem",
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter full name"
            ref={nameRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            placeholder="Enter mobile number"
            ref={mobileRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter your address"
            ref={addressRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            placeholder="Enter pincode"
            ref={pincodeRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="landmark" className="form-label">
            Landmark
          </label>
          <input
            type="text"
            className="form-control"
            id="landmark"
            placeholder="Enter a landmark if any"
            ref={landMarkRef}
          />
        </div>

        {!isOrderPlaced ? (
          <div className="d-flex justify-content-center d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              style={{ width: "80%" }}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        ) : (
          ""
        )}
        <div style={{ margin: "2rem" }}>
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
        </div>
      </form>
      {!isOrderPlaced ? (
        <div
          style={{
            margin: "2rem",
            border: "1px solid lightgray",
            padding: "2rem",
            borderRadius: "1rem",
            width: "20rem",
            height: "20rem",
            boxSizing: "border-box",
          }}
        >
          <p className="fs-4 fw-bold">Order Summary</p>
          <div>
            <span className="fw-bold">Items:</span> ₹{totalAmount}
          </div>
          <div>
            <span className="fw-bold">Delivery Charges:</span> ₹
            {deliveryCharges}
          </div>
          <hr />
          <div>
            <p className="fs-5 fw-bolder text-danger">
              Order Total: ₹
              {parseFloat(totalAmount) + parseFloat(deliveryCharges)}
            </p>
          </div>
          <hr />
          <div className="fs-6 text-muted">
            NOTE: We only support COD for now!
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid lightgray",
            height: "10rem",
            padding: "2rem",
            margin: "2rem",
            borderRadius: "1rem",
          }}
          className="alert alert-success"
        >
          <p>Order placed successfully!</p>
          <p>We will update you the status of your order soon.</p>
          <Link to="/" className="d-flex" style={{ textDecoration: "none" }}>
            <button className="btn btn-success" style={{ margin: "0 auto" }}>
              Back to Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;
