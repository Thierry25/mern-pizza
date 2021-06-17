import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderState;
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <>
      <h2>Orders </h2>
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((order) => {
            return (
              <div className="col-md-8 order-item shadow-lg p-3 mb-5">
                <div className="flex-container">
                  <div className="left w-100 m-1">
                    <h3>Items</h3>
                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <h1>
                            {item.name} [{item.varient}] * {item.quantity} ={" "}
                            {item.total}{" "}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                  <div className="left w-100 m-1">
                    <h3>Address</h3>
                    <h1>Street: {order.shippingAddress.street}</h1>
                    <h1>City: {order.shippingAddress.city}</h1>
                    <h1>Country: {order.shippingAddress.country}</h1>
                    <h1>ZipCode: {order.shippingAddress.zip}</h1>
                  </div>
                  <div className="left w-100 m-1">
                    <h3>Order Info</h3>
                    <h1>Order Amount : {order.orderAmount}</h1>
                    <h1>Date : {order.createdAt.substring(0, 10)}</h1>
                    <h1>Transaction Id : {order.transactionId}</h1>
                    <h1>Order Id: {order._id}</h1>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrdersScreen;
