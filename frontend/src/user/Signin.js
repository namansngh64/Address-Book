import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signin } from "../auth/helper/authapicalls";
import Base from "../core/Base";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    cookie: false,
    loading: false,
    success: false
  });
  let history = useNavigate(); //can pass state 
  let props = useLocation();//allows to access state 

  const message = () => {
    var msg = (props.state && props.state.message) || undefined;
    if (msg != undefined) {
      toast.success(props.state.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      msg = undefined;
      history("/signin");//cleans up state
    }
  };

  useEffect(() => {
    message();
  }, []);

  const { email, password, cookie, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const handleCheck = (event) => {
    setValues((prevState) => {
      return { ...prevState, cookie: event.target.checked };
    });
  };

  const callSignin = (event) => {
    event.preventDefault();
    if (email == "" || password == "") {
      toast.error("Fields cannot be empty!", {
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
    signin({ email, password, cookie })
      .then((res) => {
        if (res.error) {
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
        history("/", { state: { message: "Signed In Successfully!" } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base>
      <div className="container" style={{ margin: "24%", width: "50%" }}>
        <center>
          <h1 className="h3 mb-3 fw-normal"> Please sign in </h1>{" "}
          <form>
            <div className="form-floating">
              <input
                type="email"
                value={email}
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
                onChange={handleChange("email")}
              />{" "}
              <label htmlFor="floatingInput"> Email address </label>{" "}
            </div>{" "}
            <div className="form-floating">
              <input
                type="password"
                value={password}
                className="form-control"
                id="floatingPassword"
                required
                placeholder="Password"
                onChange={handleChange("password")}
              />{" "}
              <label htmlFor="floatingPassword"> Password </label>{" "}
            </div>{" "}
            <div className="checkbox mb-3">
              {" "}
              <label>
                {" "}
                <input
                  type="checkbox"
                  onChange={handleCheck}
                  checked={cookie}
                  value="remember-me"
                />{" "}
                Remember me{" "}
              </label>{" "}
            </div>{" "}
            <button
              className="w-100 btn btn-lg btn-primary"
              onClick={callSignin}
            >
              Sign in
            </button>{" "}
          </form>{" "}
          <h6>
            New User ? <Link to={"/signup"}> Signup </Link>{" "}
          </h6>{" "}
          {JSON.stringify(values)}{" "}
        </center>{" "}
      </div>{" "}
    </Base>
  );
};

export default Signin;
