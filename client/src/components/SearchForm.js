import { useRef } from "react";
import { useGlobalContext } from "../context";

function SearchForm() {
  const { setSearch } = useGlobalContext();
  const searchValue = useRef();

  const getSearch = () => {
    setSearch(searchValue.current.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{position: "fixed", width: "98.75vw", zIndex: "10", top: "4rem"}}>
      <form onSubmit={handleSubmit}>
        <div
          className="form-control d-flex justify-content-center"
          style={{ height: "4rem" }}
        >
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={getSearch}
            className="form-control"
            placeholder="Search a grocery item"
            style={{ textAlign: "center" }}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
