import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp } from "../auth/helper/authapicalls";
import Base from "../core/Base";

const Verify = () => {
  let props = useLocation();
  let history = useNavigate();
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
      history("/verify", { state: { user: props.state.user } });
    }
  };

  useEffect(() => {
    message();
  }, []);

  const handleClick = () => {
    const otp = document.getElementById("otp").value;
    verifyOtp({ otp }, props.state.user).then((res) => {
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
      history("/signin", { state: { message: res.message } });
    });
  };

  return (
    <Base>
      <div className="container" style={{ margin: "24%", width: "50%" }}>
        <h3>Verify Account</h3>
        <div className="form-floating">
          <input
            type="text"
            id="otp"
            className="form-control"
            required
            placeholder="Enter Otp"
          />
          <label htmlFor="floatingInput">Enter OTP</label>
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleClick}>
          Verify
        </button>
      </div>
    </Base>
  );
};

export default Verify;
