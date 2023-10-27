import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

export const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleForm = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    login(formValues, dispatch);
  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleLogin}>
        <h1 className="loginTitle">Login</h1>
        <div className="loginInput">
          <label className="loginLabel">Email</label>
          <input
            className="loginInputField"
            onChange={handleForm}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="loginInput">
          <label className="loginLabel">Password</label>
          <input
            className="loginInputField"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleForm}
          />
        </div>
        <button className="loginButton" disabled={isFetching}>
          Login
        </button>
      </form>
    </div>
  );
};
