import { Link } from "react-router-dom";

function Product({ _id, image, title, type, description, price, rating, height, width }) {
  return (
    <div
      className="card"
      style={{ width: "18rem", marginBottom: "1rem", marginTop: "1rem", boxSizing: "border-box" }}
    >
      <img src={image} className="card-img-top" alt={title} style={{maxHeight: "10rem"}} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fs-4 fw-bolder">{title}</h5>
          <p className="card-text fst-normal">{description.length > 40
                ? description.substring(0, 30) + "..."
                : description}</p>
          <p className="card-text"><span className="fw-bold">Type: </span>{type}</p>
          <p className="card-text"><span className="fw-bold">Dimensions: </span>{height} X {width}</p>
          <p className="card-text"><span className="fw-bold">Rating: </span>{rating}</p>
          <p className="card-text fst-italic fs-5 fw-bold">Price: ₹{price}</p>
        </div>
        <div>
          <Link to={`/products/${_id}`}>
            <button className="btn btn-primary" style={{marginTop: "2rem", "width": "100%", transformY: "-100"}}>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
