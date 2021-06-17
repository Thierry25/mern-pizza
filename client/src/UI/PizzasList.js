import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";

import Loading from "../components/Loading";
import Error from "../components/Error";

const PizzasList = () => {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  return (
    <>
      <br />
      <h2>Pizzas List</h2> <br />
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-hover table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr>
                  <td>{pizza.name}</td>
                  <td>
                    Small : {pizza.prices[0]["small"]} <br />
                    Medium : {pizza.prices[0]["medium"]} <br />
                    Large : {pizza.prices[0]["large"]}
                  </td>
                  <td>{pizza.category}</td>
                  <td>
                    <i
                      className="fa fa-trash m-1"
                      onClick={() => {
                        dispatch(deletePizza(pizza._id));
                      }}
                    ></i>
                    <a href={`/admin/editpizza/${pizza._id}`}>
                      <i className="fa fa-edit m-1 "></i>
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default PizzasList;
