import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "./Base";

const Home = () => {
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
      history("/");
    }
  };

  const preload = () => {
    //
  };

  useEffect(() => {
    message();
    preload();
  }, []);

  return (
    <Base>
      <center>
        <h2>Welcome </h2>
      </center>
    </Base>
  );
};

export default Home;
