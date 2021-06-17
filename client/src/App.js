import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./UI/HomeScreen";
import CartScreen from "./UI/CartScreen";
import LoginScreen from "./UI/LoginScreen";
import RegisterScreen from "./UI/RegisterScreen";
import OrdersScreen from "./UI/OrdersScreen";
import AdminScreen from "./UI/AdminScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/cart" exact component={CartScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/orders" exact component={OrdersScreen} />
        <Route path="/admin" component={AdminScreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
