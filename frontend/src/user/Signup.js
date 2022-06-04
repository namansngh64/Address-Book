import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../auth/helper/authapicalls";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    loading: false,
    success: false
  });

  let history = useNavigate();

  const { name, email, password, c_password, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const callSignup = (event) => {
    event.preventDefault();
    console.log("hello");
    if (password !== c_password) {
      toast.error("Password doesn't match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }
    signup({ name, email, password }).then((res) => {
      console.log(res);
      if (res.error) {
        toast.error(res.error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        return;
      }
      history("/verify", { state: { message: "OTP Sent!", user: res } });
    });
  };

  return (
    <Base>
      <div className="container" style={{ margin: "24%", width: "50%" }}>
        <center>
          <h1 className="h3 mb-3 fw-normal">Please Enter Info</h1>
          <form>
            <div className="form-floating">
              <input
                type="text"
                value={name}
                className="form-control"
                id="floatingInput1"
                placeholder="Joe"
                required
                onChange={handleChange("name")}
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
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
            <div className="form-floating">
              <input
                type="password"
                value={c_password}
                className="form-control"
                id="floatingPassword"
                required
                placeholder="Confirm Password"
                onChange={handleChange("c_password")}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <br />
            {/* <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                // onChange={handleCheck}
                // checked={cookie}
                value="remember-me"
              />{" "}
              Remember me
            </label>
          </div> */}
            <button
              className="w-100 btn btn-lg btn-primary"
              onClick={callSignup}
            >
              Sign up
            </button>
          </form>
          <h6>
            Already A User? <Link to={"/signin"}>Signin</Link>
          </h6>
          {JSON.stringify(values)}
        </center>
      </div>
    </Base>
  );
};

export default Signup;
