// FIle to CRUD
import axios from "axios";

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
    console.log(response);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/getpizzabyid", { pizzaid });
    console.log(response);
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: error });
  }
};

export const filterPizzas = (searchKey, category) => async (dispatch) => {
  let filteredPizzas;
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
    filteredPizzas = response.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchKey)
    );
    if (category !== "all") {
      filteredPizzas = response.data.filter(
        (pizza) => pizza.category.toLowerCase() === category
      );
    }
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/addpizza", { pizza });
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

export const editPizza = (editedPizza) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/editpizza", { editedPizza });
    console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    window.location.href = "/admin/pizzaslist";
  } catch (error) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};

export const deletePizza = (pizzaId) => async (dispatch) => {
  try {
    const response = await axios.post("/api/pizzas/deletepizza", { pizzaId });
    alert("Pizza Successfully Deleted");
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("Something went wrong");
  }
};
