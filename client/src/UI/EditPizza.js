import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaById } from "../actions/pizzaActions";
import { editPizza } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

const EditPizza = ({ match }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("non-vegetarian");

  const getPizzaByIdState = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error, loading } = getPizzaByIdState;
  const editPizzaState = useSelector((state) => state.editPizzaReducer);
  const { editLoading, editError, editSuccess } = editPizzaState;

  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaid) {
        setName(pizza.name);
        setDescription(pizza.description);
        setCategory(pizza.category);
        setImage(pizza.image);
        setSmallPrice(pizza.prices[0]["small"]);
        setMediumPrice(pizza.prices[0]["medium"]);
        setLargePrice(pizza.prices[0]["large"]);
      } else {
        dispatch(getPizzaById(match.params.pizzaid));
      }
    } else {
      dispatch(getPizzaById(match.params.pizzaid));
    }
  }, [pizza, dispatch]);

  const onNameChanged = (event) => {
    setName(event.target.value);
  };
  const onSmallPriceChanged = (event) => {
    setSmallPrice(event.target.value);
  };
  const onMediumPriceChanged = (event) => {
    setMediumPrice(event.target.value);
  };
  const onLargePriceChanged = (event) => {
    setLargePrice(event.target.value);
  };
  const onImageChanged = (event) => {
    setImage(event.target.value);
  };
  const onDescriptionChanged = (event) => {
    setDescription(event.target.value);
  };
  const onCategoryChanged = (event) => {
    setCategory(event.target.value);
  };

  const formHandler = (event) => {
    event.preventDefault();

    const editedPizza = {
      _id: match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    };
    dispatch(editPizza(editedPizza));
  };

  return (
    <>
      <br />
      <h2>Edit Pizza</h2> <br />
      <div className="left">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editSuccess && <Success message="Pizza Details Successfully edited" />}
        {editLoading && <Loading />}

        <form onSubmit={formHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Pizza Name"
            value={name}
            onChange={onNameChanged}
            required
          />
          <input
            type="number"
            className="form-control"
            placeholder="Small Varient Price"
            value={smallPrice}
            onChange={onSmallPriceChanged}
            min="1"
            required
          />
          <input
            type="number"
            className="form-control"
            placeholder="Medium Varient Price"
            value={mediumPrice}
            onChange={onMediumPriceChanged}
            min="1"
            required
          />
          <input
            type="number"
            className="form-control"
            placeholder="Large Varient Price"
            value={largePrice}
            onChange={onLargePriceChanged}
            min="1"
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image Url"
            value={image}
            onChange={onImageChanged}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Pizza Description"
            value={description}
            onChange={onDescriptionChanged}
            required
          />
          <select
            className="form-control mt-2"
            value={category}
            onChange={onCategoryChanged}
            required
          >
            <option value="vegetarian">vegetarian</option>
            <option value="non-vegetarian">non-vegetarian</option>
          </select>
          <button className="btn mt-3" type="submit">
            Edit Pizza
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPizza;
