import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Base from "../core/Base";
import { getUser, updateUser1 } from "./helper/userapicalls";

const Edit = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    userInfo: "",
    profile_pic: "",
    address: "",
    phone: "",
    formdata: new FormData()
  });
  const { name, email, userInfo, profile_pic, address, phone, formdata } =
    values;

  const preload = () => {
    getUser().then((res) => {
      setValues({
        ...values,
        name: res.name,
        email: res.email,
        userInfo: res.userInfo ? res.userInfo : "",
        profile_pic: res.profile_pic ? res.profile_pic : "",
        address: res.address ? res.address : "",
        phone: res.phone ? res.phone : ""
      });
      console.log(res);
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const callUpdateUser = (e) => {
    e.preventDefault();
    formdata.set("name", name);
    formdata.set("email", email);
    formdata.set("phone", phone);
    formdata.set("userInfo", userInfo);
    formdata.set("address", address);
    updateUser1(formdata)
      .then((data) => {
        if (data.error) {
          toast.error(data.error.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
          toast.error(data.error, {
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
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        preload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base>
      <center>
        <h2>Edit Profile</h2>
      </center>
      <img src={profile_pic} />
      <form encType="multipart/form-data">
        <input type="file" id="myFile" name="filename" className="m-2" />
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            // id="name"
            placeholder="Joe"
            value={name}
            onChange={handleChange("name")}
            required
          />
          <label htmlFor="floatingInput"> Name * </label>{" "}
        </div>{" "}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            // id="email"
            placeholder="name@example.com"
            disabled
            value={email}
            //   onChange={handleChange("email")}
          />{" "}
          <label htmlFor="floatingInput"> Email address * </label>{" "}
        </div>
        <br />
        <h6> Additional Info </h6>{" "}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            // id="address"
            placeholder="Appartment No 16 New Delhi 110044"
            value={address}
            onChange={handleChange("address")}
          />{" "}
          <label htmlFor="floatingPassword"> Address </label>{" "}
        </div>{" "}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            // id="phone"
            placeholder="9919191919919"
            value={phone}
            onChange={handleChange("phone")}
          />{" "}
          <label htmlFor="floatingPassword"> Phone Number </label>{" "}
        </div>
        <div className="form-floating">
          <textarea
            type="text"
            className="form-control"
            // id="address"
            placeholder="Hello My name is Test"
            rows={10}
            value={userInfo}
            onChange={handleChange("userInfo")}
          ></textarea>{" "}
          <label htmlFor="floatingPassword"> User Info </label>{" "}
        </div>{" "}
        <br />
        <button
          className="btn btn-outline-primary m-1"
          onClick={callUpdateUser}
        >
          Save Profile{" "}
        </button>{" "}
        {JSON.stringify(values)}
      </form>
    </Base>
  );
};

export default Edit;
