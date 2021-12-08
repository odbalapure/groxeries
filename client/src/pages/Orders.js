import axios from "axios";
import React, { useState } from "react";

// const url = "http://localhost:5000/api/v1/orders";
const url = "https://ekart-express-api.herokuapp.com/api/v1/orders";

function Orders() {
  const [orders, setOrders] = useState([]);

  /**
   * @desc  Get all orders
   */
  const getOrders = async () => {
    if (localStorage.getItem("ekartToken")) {
      const response = await axios.get(url, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
        },
      });

      console.log(response.data.products);
      setOrders(response.data.products);
    }
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {orders.map((order) => {
        return (
          <div key={order._id} className="card">
            <div className="card-body row">
              <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 d-flex flex-column justify-content-center align-items-center"><span className="fw-bold">Order ID:</span> {order._id}</div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center align-items-center">
                <p className="fw-bold">{order.address}</p>
                <p className="fw-bold">{order.pincode}</p>
                <p>{order.mobile}</p>
                <p className="fst-italic fw-lighter">{order.landMark}</p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
                {order.orderDetails.map((item) => {
                  return (
                    <div key={item._id}>
                      <section className="d-flex flex-column justify-content-center align-items-center">
                        <label className="fw-bold">{item.title}</label>
                        <ul>
                          <li>Price: {item.price}</li>
                          <li>Quantity: {item.quantity}</li>
                        </ul>
                      </section>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center fw-bold">Total: {order.totalAmount}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
