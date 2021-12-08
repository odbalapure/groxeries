import axios from "axios";
import { useGlobalContext } from "../context";

// const url = "http://localhost:5000/api/v1/cart";
const url = "https://ekart-express-api.herokuapp.com/api/v1/cart";

function CartItem({
  _id,
  description,
  image,
  title,
  price,
  orderDetails,
  updatedCartTotal,
}) {
  const { fetchCartItems } = useGlobalContext();

  /**
   * @desc    Remove an item from cart
   */
  const removeItem = async () => {
    await axios.delete(`${url}/${_id}`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
      },
      data: {
        cartId: JSON.parse(localStorage.getItem("ekartToken")).cartId,
      },
    });

    fetchCartItems();
  };

  return (
    <div className="container card">
      <div className="row card-body">
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
          <img
            style={{ maxWidth: "10rem", margin: "0 auto" }}
            alt={title}
            src={image}
          />
        </div>
        <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12 d-flex flex-column justify-content-center align-items-center">
          <p className="fw-bold fs-4">{title}</p>
          <p style={{ width: "10rem" }}>{description}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
          <p className="fw-bold fs-4">₹ {price}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
          <button className="btn btn-danger" onClick={removeItem}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
