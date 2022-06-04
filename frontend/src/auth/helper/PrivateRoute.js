import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { genToken } from "./authapicalls";

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const preload = () => {
    genToken().then((res) => {
      setToken(res.data.token);
      setLoading(false);
    });
  };
  useEffect(() => {
    preload();
    return () => {
      setToken();
      setLoading();
    };
  }, []);

  if (!loading && token != undefined) {
    return children;
  }
  if (!loading) return <Navigate to="/signin" />;
};

export default PrivateRoute;
