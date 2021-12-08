import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Product from "./Product";

function ProductList() {
  const { products, search } = useGlobalContext();

  if (products.length === 0 && search === "") {
    return <Loading />;
  }

  return (
    <div
      className="container d-flex flex-row justify-content-around flex-wrap"
      style={{ marginTop: "10rem" }}
    >
      {products.map((product) => {
        return <Product key={product._id} {...product} />;
      })}
    </div>
  );
}

export default ProductList;
