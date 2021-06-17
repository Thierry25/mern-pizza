import classes from "../UI/Pizza.module.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AOS from "aos";
import "aos/dist/aos.css";

const Pizza = (props) => {
  AOS.init();
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const onVarientChange = (event) => {
    setVarient(event.target.value);
  };

  const dispatch = useDispatch();
  const onAddToCart = () => {
    dispatch(addToCart(props.pizza, quantity, varient));
  };

  return (
    <div
      data-aos="zoom-in"
      className={`${classes.topview} shadow p-3 mb-5 bg-white rounded `}
    >
      <div onClick={handleShow}>
        <h1 className={classes.header}>{props.pizza.name}</h1>
        <p>Category: {props.pizza.category}</p>
        <img
          src={props.pizza.image}
          className={classes.image}
          alt={props.pizza.description}
        />
      </div>
      <div className="flex-container">
        <div className="w-100 m-1">
          <p>Varients</p>
          <select
            className="form-control"
            value={varient}
            onChange={onVarientChange}
          >
            {props.pizza.varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={onQuantityChange}
          >
            {[...Array(10).keys()].map((object, index) => {
              return <option value={index + 1}>{index + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className={`${classes.space} flex-container`}>
        <div className="m-1 w-100">
          <h1 className="mt-1">
            Price : {props.pizza.prices[0][varient] * quantity} NTD
          </h1>
        </div>
        <div className="m-1 w-100">
          <button className="btn" onClick={onAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{props.pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={props.pizza.image}
            className={`${classes.image} img-fluid`}
            alt={props.pizza.description}
          />
          <p className={classes.format}>{props.pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Pizza;
