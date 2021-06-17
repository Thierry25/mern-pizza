import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginState = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const user = { email, password };
    dispatch(loginUser(user));
    setEmail("");
    setPassword("");
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 left shadow-lg p-3 mb-5 bg-body rounded">
          <h2 className="text-center m-2">Login</h2>
          {loading && <Loading />}
          {error && <Error error="Invalid Credentials" />}
          <form onSubmit={submitHandler}>
            <input
              required
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={passwordChangeHandler}
            />
            <button type="submit" className="btn mt-3">
              LOGIN
            </button>
          </form>
          <br />
          <a className="link" href="/register">
            No Account? Click Here to Join the Family
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
