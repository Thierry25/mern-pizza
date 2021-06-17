import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Success from "./Success";
import Loading from "./Loading";
import Error from "./Error";

const Checkout = (props) => {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const dispatch = useDispatch();
  const tokenHandler = (token) => {
    console.log(token);
    dispatch(placeOrder(token, props.subTotal));
  };

  const loginHandler = () => {
    alert("You need to log in, in order to order Pizzas! Thank You");
  };

  return (
    <>
      {currentUser ? (
        <>
          {loading && <Loading />}
          {error && <Error error="Something went wrong" />}
          {success && <Success message="Order Successfully Placed" />}
          <StripeCheckout
            amount={props.subTotal * 100}
            shippingAddress
            token={tokenHandler}
            currency="NTD"
            stripeKey="pk_test_51IvWePCEKXJra7led7sr5u1dxeJqQTko4cSD8pfmhT8FctziNi2pkrZCAN03aDxlvc5yTcYz68JDtTAdWBXwbOLu00EqdeNXLi"
          >
            <button className="btn">CHECKOUT</button>
          </StripeCheckout>
        </>
      ) : (
        <button className="btn" onClick={loginHandler}>
          CHECKOUT
        </button>
      )}
    </>
  );
};

export default Checkout;
