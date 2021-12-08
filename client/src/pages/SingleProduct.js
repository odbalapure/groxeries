import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

// const url = "http://localhost:5000/api/v1/products";
const url = "https://ekart-express-api.herokuapp.com/api/v1/products";
// const addToCartUrl = "http://localhost:5000/api/v1/cart";
const addToCartUrl = "https://ekart-express-api.herokuapp.com/api/v1/cart";

function SingleProduct() {
  let isUserLoggedIn = false;
  let isSeller = false;
  let cartId = "";
  const localStorageObj = localStorage.getItem("ekartToken");

  const userObj = JSON.parse(localStorageObj);

  if (localStorageObj !== null) {
    isUserLoggedIn = true;
    isSeller = userObj.isSeller;
    cartId = userObj.cartId;
  }

  /* Navigate to the home page */
  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });

  const { getProducts, setCartCount, cartCount } = useGlobalContext();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  /**
   * @desc    Get product with given id
   * @return  none
   * @params  none
   * @request GET
   */
  const getProduct = useCallback(async () => {
    const response = await axios.get(`${url}/${id}`);
    setProduct(response.data.product);
  }, [id]);

  /**
   * @desc    Delete product with given id
   * @return  none
   * @params  id
   * @request DELETE
   */
  const deleteProduct = async (id) => {
    await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
      },
    });
    navigateToProducts();
    getProducts();
  };

  /**
   * @desc    Edit product with given id
   * @return  none
   * @params  id
   * @request PATCH
   */
  const editProduct = async () => {
    navigate("/products/add", { state: product });
  };

  /**
   * @desc    Add a product to a cart
   * @return  none
   * @params  id
   * @request PATCH
   */
  const addToCart = async () => {
    await axios.patch(`${addToCartUrl}/${cartId}`, product, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
      },
    });
    
    setAddedToCart(true);
    let tempCartCount = cartCount;
    setCartCount(++tempCartCount);
  };

  /* Execute function when component is rendered */
  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <>
      <div className="d-flex flex-wrap row" style={{ margin: "8rem 2rem" }}>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="h-100 p-5 text-white bg-dark">
            <picture>
              <img
                src={product.image}
                alt={product.name}
                style={{ height: "10rem" }}
                className="img-fluid mx-auto d-block h-100 d-inline-block"
              />
            </picture>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="h-100 p-5 bg-light border">
            <h2>{product.title}</h2>
            <p className="card-text fst-normal">{product.description}</p>
            <p className="card-text">
              <span className="fw-bold">Type: </span>
              {product.type}
            </p>
            <p className="card-text">
              <span className="fw-bold">Dimensions: </span>
              {product.height} X {product.width}
            </p>
            <p className="card-text">
              <span className="fw-bold">Rating: </span>
              {product.rating}
            </p>
            <p className="card-text fst-italic fs-5 fw-bold">
              Price: {product.price}
            </p>
            {isUserLoggedIn && isSeller ? (
              <div
                className="btn-group gap-2"
                role="group"
                aria-label="Basic example"
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "50%" }}
                  onClick={editProduct}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ width: "50%" }}
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
            {isUserLoggedIn && !isSeller ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={addToCart}
              >
                Add to Cart
              </button>
            ) : null}
            {addedToCart ? (
              <Link to="/cart" className="d-flex justify-content-center" style={{textDecoration: "none"}}>
                <button style={{ margin: "0 auto", width: "100%" }} className="btn btn-info">
                  Go to Cart
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-success fw-bold"
            style={{
              width: "60%",
              borderRadius: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            Back To Home
          </button>
        </div>
      </Link>
    </>
  );
}

export default SingleProduct;
