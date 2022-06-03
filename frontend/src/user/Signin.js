import React, { useState } from "react";
import { signin } from "../auth/helper/authapicalls";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    cookie: false,
    loading: false,
    success: false
  });
  const { email, password, cookie, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const callSignin = () => {
    signin({ email, password, cookie })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container" style={{ margin: "24%", width: "50%" }}>
      <center>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            value={email}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            onChange={handleChange("email")}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            value={password}
            className="form-control"
            id="floatingPassword"
            required
            placeholder="Password"
            onChange={handleChange("password")}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" onClick={callSignin}>
          Sign in
        </button>
        {JSON.stringify(values)}
      </center>
    </div>
  );
};

export default Signin;
