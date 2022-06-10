/** @format */

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAddress,
  getAllUserAddresses,
  updateAddress,
  deleteAddress
} from "../address/helper/addressapicalls";
import { genToken, signout } from "../auth/helper/authapicalls";
import Base from "./Base";
import { Modal } from "bootstrap";

const Home = () => {
  let props = useLocation();
  let history = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [create, setCreate] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [evalues, setEValues] = useState({
    e_name: "",
    e_email: "",
    e_phone: "",
    e_address: "",
    id: "",
    edit: false
  });

  const { email, address, name, phone } = values;
  const { e_email, e_address, e_name, e_phone, edit, id } = evalues;
  const [add_id, setAdd_id] = useState("");
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
    getAllUserAddresses().then((res) => {
      setAddresses([...res]);
    });
  };

  useEffect(() => {
    message();
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };
  const handleEChange = (name) => (event) => {
    setEValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const displayCards = () => {
    var res = [];
    addresses.map((address, index) => {
      res.push(
        addressCard(
          address._id,
          index,
          address.name,
          address.address,
          address.phone ? address.phone : undefined,
          address.email ? address.email : undefined
        )
      );
    });
    return res;
  };

  // const showEditAddress = (id) => {
  //   console.log(e_name);
  // };

  const showModal = (a_id) => {
    var modal = new Modal(document.getElementById("myModal"));
    document.getElementById("AddressId").value = a_id; //another option
    setAdd_id(a_id);
    modal.show();
  };

  const callupdateAddress = () => {
    const add = {
      email: e_email,
      address: e_address,
      name: e_name,
      phone: e_phone
    };
    updateAddress(id, add).then((data) => {
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
      setEValues({
        ...values,
        edit: !edit
      });
    });
  };
  const calldeleteAddress = () => {
    var myModalEl = document.getElementById("myModal");
    var modal = Modal.getInstance(myModalEl);
    deleteAddress(add_id).then((data) => {
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
    });
    modal.hide();
  };

  const addressCard = (id, key, name, address, phone, email) => {
    return (
      <div className="card" key={key} style={{ marginTop: "1%" }}>
        <h5 className="card-header"> {name} </h5>{" "}
        <div className="card-body">
          <h5 className="card-title"> {address} </h5>{" "}
          <p className="card-text">
            {" "}
            {phone != undefined && (
              <>
                Phone Number: {phone} <br />
              </>
            )}{" "}
            {email != undefined && <> Email: {email} </>}{" "}
          </p>{" "}
          <button
            onClick={() => {
              console.log(name);
              setEValues({
                ...values,
                e_name: name,
                e_address: address,
                e_phone: phone,
                e_email: email,
                edit: !edit,
                id: id
              });
              // showEditAddress();
            }}
            className="btn btn-warning"
            style={{ margin: "1%" }}
          >
            Edit{" "}
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => {
              showModal(id);
            }}
          >
            {" "}
            Delete{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  };

  const showAddress = () => {
    setCreate(!create);
  };

  const saveAddress = () => {
    createAddress({ name, address, phone, email }).then((data) => {
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
    });
    showAddress();
    // showAddress();
  };

  const callsignout = () => {
    signout().then((res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      history("/signin", { state: { message: res.message } });
    });
  };

  return (
    <Base>
      <center>
        <h2> Welcome </h2>{" "}
        <button
          className="btn btn-outline-danger"
          style={{ float: "right" }}
          onClick={callsignout}
        >
          Signout{" "}
        </button>{" "}
        <Link
          className="btn btn-warning"
          style={{ float: "right", marginRight: "1%" }}
          to="/edit"
        >
          Edit profile
        </Link>
      </center>{" "}
      {!create && (
        <button className="btn btn-primary" onClick={showAddress}>
          Create Address{" "}
        </button>
      )}{" "}
      {create && (
        <button className="btn btn-danger" onClick={showAddress}>
          X{" "}
        </button>
      )}{" "}
      <br />
      <br />{" "}
      <div id="myModal" className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Do you want to delete this?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>This action cannot be undone!</p>
            </div>
            <input type="text" id="AddressId" hidden />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={calldeleteAddress}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {create && (
        <>
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
              type="text"
              className="form-control"
              // id="address"
              placeholder="Appartment No 16 New Delhi 110044"
              value={address}
              onChange={handleChange("address")}
            />{" "}
            <label htmlFor="floatingPassword"> Address * </label>{" "}
          </div>{" "}
          <br />
          <h6> Additional Info </h6>{" "}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              // id="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleChange("email")}
            />{" "}
            <label htmlFor="floatingInput"> Email address </label>{" "}
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
          </div>{" "}
          <br />
          <button className="btn btn-outline-primary m-1" onClick={saveAddress}>
            Save Address{" "}
          </button>{" "}
          {JSON.stringify(values)}{" "}
        </>
      )}{" "}
      {edit && (
        <>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Joe"
              value={e_name}
              onChange={handleEChange("e_name")}
              required
            />
            <label htmlFor="floatingInput"> Name * </label>{" "}
          </div>{" "}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Appartment No 16 New Delhi 110044"
              value={e_address}
              onChange={handleEChange("e_address")}
            />{" "}
            <label htmlFor="floatingPassword"> Address * </label>{" "}
          </div>{" "}
          <br />
          <h6> Additional Info </h6>{" "}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={e_email}
              onChange={handleEChange("e_email")}
            />{" "}
            <label htmlFor="floatingInput"> Email address </label>{" "}
          </div>{" "}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="9919191919919"
              value={e_phone}
              onChange={handleEChange("e_phone")}
            />{" "}
            <label htmlFor="floatingPassword"> Phone Number </label>{" "}
          </div>{" "}
          <br />
          <button
            className="btn btn-outline-warning"
            onClick={callupdateAddress}
          >
            Update Address{" "}
          </button>{" "}
          {JSON.stringify(evalues)}{" "}
        </>
      )}{" "}
      {displayCards()}{" "}
    </Base>
  );
};

export default Home;
