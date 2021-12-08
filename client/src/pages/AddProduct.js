import { useRef } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const url = "https://products-api-express.herokuapp.com/api/v1/products";
// const url = "http://localhost:5000/api/v1/products";

function AddProduct() {
  const location = useLocation();
  console.log(location.state);

  const { getProducts } = useGlobalContext();
  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });

  const nameRef = useRef();
  const typeRef = useRef();
  const imageRef = useRef();
  const heightRef = useRef();
  const widthRef = useRef();
  const priceRef = useRef();
  const ratingRef = useRef();
  const descriptionRef = useRef();

  /**
   * @desc      Function to create a product (Only sellers can add products)
   * @request   POST
   * @params    none
   * @return    none
   */
  const createProduct = async () => {
    const name = nameRef.current.value;
    const type = typeRef.current.value;
    const image = imageRef.current.value;
    const height = heightRef.current.value;
    const width = widthRef.current.value;
    const price = priceRef.current.value;
    const rating = ratingRef.current.value;
    const description = descriptionRef.current.value;

    await axios.post(
      `${url}`,
      {
        title: name,
        type: type,
        image: image,
        height: height,
        width: width,
        price: price,
        rating: rating,
        description: description,
      },
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
        },
      }
    );

    navigateToProducts();
    getProducts();
  };

  const editProduct = async () => {
    const name = nameRef.current.value;
    const type = typeRef.current.value;
    const image = imageRef.current.value;
    const height = heightRef.current.value;
    const width = widthRef.current.value;
    const price = priceRef.current.value;
    const rating = ratingRef.current.value;
    const description = descriptionRef.current.value;

    await axios.patch(
      `${url}/${location.state._id}`,
      {
        title: name,
        type: type,
        image: image,
        height: height,
        width: width,
        price: price,
        rating: rating,
        description: description,
      },
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
        },
      }
    );

    navigateToProducts();
    getProducts();
  };

  return (
    <div className="container">
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
            placeholder="Name of product"
            ref={nameRef}
            defaultValue={location.state ? location.state.title : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            placeholder="Type of product"
            ref={typeRef}
            defaultValue={location.state ? location.state.type : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Image of product"
            ref={imageRef}
            defaultValue={location.state ? location.state.image : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Height
          </label>
          <input
            type="text"
            className="form-control"
            id="height"
            placeholder="Height of product"
            ref={heightRef}
            defaultValue={location.state ? location.state.height : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="width" className="form-label">
            Width
          </label>
          <input
            type="text"
            className="form-control"
            id="width"
            placeholder="Width of product"
            ref={widthRef}
            defaultValue={location.state ? location.state.width : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Price of product"
            ref={priceRef}
            defaultValue={location.state ? location.state.price : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="type"
            placeholder="Rating of product"
            ref={ratingRef}
            defaultValue={location.state ? location.state.rating : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="Description of product"
            ref={descriptionRef}
            defaultValue={location.state ? location.state.description : ""}
          />
        </div>
        <div className="d-flex justify-content-center d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            style={{ width: "80%" }}
            onClick={location.state ? editProduct : createProduct}
          >
            {location.state ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
