import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UsersList from "./UsersList";
import OrdersList from "./OrdersList";
import PizzasList from "./PizzasList";
import AddPizza from "./AddPizza";
import EditPizza from "./EditPizza";

const AdminScreen = () => {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2>Admin Panel</h2>
          <ul className="adminfunctions">
            <li>
              <a href="/admin/userslist">Users List</a>
            </li>
            <li>
              <a href="/admin/pizzaslist">Pizzas List</a>
            </li>
            <li>
              <a href="/admin/addpizza">Add New Pizza</a>
            </li>
            <li>
              <a href="/admin/orderslist">Orders List</a>
            </li>
          </ul>

          <BrowserRouter>
            <Route path="/admin" component={UsersList} exact />
            <Route path="/admin/userslist" component={UsersList} exact />
            <Route path="/admin/orderslist" component={OrdersList} exact />
            <Route path="/admin/pizzaslist" component={PizzasList} exact />
            <Route path="/admin/addpizza" component={AddPizza} exact />
            <Route
              path="/admin/editpizza/:pizzaid"
              component={EditPizza}
              exact
            />
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default AdminScreen;
