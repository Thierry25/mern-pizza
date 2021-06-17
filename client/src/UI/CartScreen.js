import { useSelector, useDispatch } from "react-redux";
import classes from "./Pizza.module.css";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";

const CartScreen = () => {
  AOS.init();
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();

  let subTotal = cartItems.reduce((x, item) => x + item.total, 0);

  return (
    <>
      <div className="row justify-content-center p-2" data-aos="fade-down">
        <div className="col-md-8 col-lg-8">
          <h2 className="mb-5">My Cart</h2>
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="left m-1 w-100">
                  <h1>
                    {item.name} [{item.varient}]
                  </h1>
                  <h1>
                    Price: {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.total}
                  </h1>
                  <h1 className="inline">Quantity:</h1>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.varient)
                      );
                    }}
                  />
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    // verify if value is greater than zero
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(
                          addToCart(item, item.quantity - 1, item.varient)
                        );
                      } else {
                        dispatch(deleteFromCart(item));
                      }
                    }}
                  />
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img src={item.image} className={classes.cart} />
                </div>

                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-4"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-3 col-lg-3 right">
          <h2>Total : {subTotal} NTD</h2>
          {subTotal > 0 && <Checkout subTotal={subTotal} />}
        </div>
      </div>
    </>
  );
};

export default CartScreen;
