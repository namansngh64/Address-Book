import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base = ({ className = " text-black p-2", children }) => {
  return (
    <div className="">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container-fluid">
        <div className={className}>{children}</div>
      </div>
      <div className="fixed-bottom  ">
        <div className="container-fluid bg-dark  text-white text-center py-1">
          <h6>Developed by Sneha & Naman</h6>
        </div>
      </div>
    </div>
  );
};
export default Base;
