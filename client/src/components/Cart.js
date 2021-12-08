import { useGlobalContext } from "../context";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cartCount, cartItems } = useGlobalContext();

  // Send order details to the parent
  const orderDetails = cartItems.map((item) => {
    return {
      _id: item._id,
      title: item.title,
      price: item.price,
      quantity: 1,
      total: 0,
    };
  });

  // Total total cart value
  let totalAmount = cartItems.reduce((acc, curr) => {
    acc += parseFloat(curr.price);
    return acc;
  }, 0);

  /**
   * @desc    Pass order details to Checkout
   */
  const passDetailsToCheckout = () => {
    navigate(`/checkout#total=${totalAmount}`, {
      state: orderDetails,
    });
  };

  return (
    <div className="container" style={{ marginTop: "8rem", marginBottom: "1rem" }}>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-3">You have {cartCount} items in your cart</p>
      </div>
      <hr className="bg-danger border-2 border-top border-dark" />
      {cartItems.map((item) => {
        return (
          <CartItem key={item._id} {...item} orderDetails={orderDetails} />
        );
      })}
      <div
        className="d-flex flex-wrap justify-content-around"
        style={{ margin: "0 auto", border: "1px solid lightgray", padding: "1rem" }}
      >
        <p className="fs-3">Total: {totalAmount}</p>
        {totalAmount > 0 ? (
          <button
            className="btn btn-warning"
            style={{ borderRadius: "3rem" }}
            onClick={passDetailsToCheckout}
          >
            Proceed to checkout
          </button>
        ) : (
          <button
            className="btn btn-warning"
            style={{ borderRadius: "3rem" }}
            disabled
          >
            Proceed to checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
