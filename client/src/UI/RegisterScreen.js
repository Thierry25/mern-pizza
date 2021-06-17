import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Success from "../components/Success";
import Loading from "../components/Loading";
import Error from "../components/Error";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerState = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerState;

  const dispatch = useDispatch();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const setConfirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("The passwords are not matching. Please re-enter the passwords");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(registerUser(user));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 left shadow-lg p-3 mb-5 bg-body rounded">
          {loading && <Loading />}
          {success && <Success message="User Registered Successfully" />}
          {error && <Error error="Email already registered" />}
          <h2 className="text-center m-2">Register</h2>
          <form onSubmit={submitHandler}>
            <input
              required
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={nameChangeHandler}
            />
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
            <input
              required
              type="password"
              placeholder="Re-enter password"
              className="form-control"
              value={confirmPassword}
              onChange={setConfirmPasswordChangeHandler}
            />
            <button type="submit" className="btn mt-3">
              REGISTER
            </button>
          </form>
          <br />
          <a className="link" href="/login">
            Already have Account? Click here to Login
          </a>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
