import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";

const Filter = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("all");

  const onFilterData = () => {
    dispatch(filterPizzas(searchKey, category));
  };

  const onSearchPizzas = (event) => {
    setSearchKey(event.target.value.toLowerCase());
  };

  const onCategory = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className="container">
      <div className="row justify-content-center shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-3">
          <input
            onChange={onSearchPizzas}
            value={searchKey}
            type="text"
            className="form-control w-100"
            placeholder="Search pizzas"
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control w-100 mt-2"
            value={category}
            onChange={onCategory}
          >
            <option value="all">All</option>
            <option value="non-vegetarian">non-vegetarian</option>
            <option value="vegetarian">vegetarian</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn w-100 mt-2" onClick={onFilterData}>
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
