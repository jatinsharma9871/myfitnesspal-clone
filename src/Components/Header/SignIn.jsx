import React from "react";
import "./SignIn.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isToken, userData } from "../../store/actions";
import { Link } from "react-router-dom";

function SignIn() {
const { token, data } = useSelector((state) => ({
  token: state.token,
  data: state.data,
}));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2345/login", formData)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        // console.log(res);
        dispatch(isToken(true));
        console.log(token);
        // console.log(res.data.user);
        dispatch(userData(res.data.user));
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  


  return (
    <>
      <div className="signIn">
        <h5 className="h5">Member Login</h5>
        <form className="myForm" onSubmit={handleSubmit}>
          <input
            className="email"
            id="email"
            placeholder="Email address"
            onChange={handleChange}
          />
          <br />
          <input
            className="password"
            id="password"
            placeholder="Create a password"
            onChange={handleChange}
          />
          <br />
          <a className="label">Forgot password?</a>
          <br />
          <input type="submit" value="LOG IN" className="btn" />
        </form>
        <label className="label">or</label>
        <br />
        <a href="http://localhost:2345/auth/google">
          <button className="btn2">CONTINUE WITH GOOGLE</button>
        </a>
      </div>
      <p className="p">
        Not a member Yet?<span className="span">Sign up Now!</span>
      </p>
      {token ? <Navigate to={`/`} /> : <Navigate to={`/register`} />}
    </>
  );
}

export { SignIn };
