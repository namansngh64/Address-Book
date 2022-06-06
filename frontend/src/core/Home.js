import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAddress,
  getAllUserAddresses
} from "../address/helper/addressapicalls";
import { genToken } from "../auth/helper/authapicalls";
import Base from "./Base";

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

  const updateAddress = () => {
    //
  };

  const addressCard = (id, key, name, address, phone, email) => {
    return (
      <div className="card" key={key} style={{ marginTop: "1%" }}>
        <h5 className="card-header">{name}</h5>
        <div className="card-body">
          <h5 className="card-title">{address}</h5>
          <p className="card-text">
            {phone != undefined && (
              <>
                Phone Number:
                {phone}
                <br />
              </>
            )}
            {email != undefined && (
              <>
                Email:
                {email}
              </>
            )}
          </p>
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
            Edit
          </button>
          <button className="btn btn-danger">Delete</button>
        </div>
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
    });
    preload();
    showAddress();
  };

  return (
    <Base>
      <center>
        <h2>Welcome </h2>
        <button className="btn btn-outline-danger" style={{ float: "right" }}>
          Signout
        </button>
      </center>
      {!create && (
        <button className="btn btn-primary" onClick={showAddress}>
          Create Address
        </button>
      )}
      {create && (
        <button className="btn btn-danger" onClick={showAddress}>
          X
        </button>
      )}
      <br />
      <br />
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
            <label htmlFor="floatingInput">Name*</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              // id="address"
              placeholder="Appartment No 16 New Delhi 110044"
              value={address}
              onChange={handleChange("address")}
            />
            <label htmlFor="floatingPassword">Address*</label>
          </div>
          <br />
          <h6>Additional Info</h6>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              // id="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleChange("email")}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              // id="phone"
              placeholder="9919191919919"
              value={phone}
              onChange={handleChange("phone")}
            />
            <label htmlFor="floatingPassword">Phone Number</label>
          </div>
          <br />
          <button className="btn btn-outline-primary m-1" onClick={saveAddress}>
            Save Address
          </button>

          {JSON.stringify(values)}
        </>
      )}
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
            <label htmlFor="floatingInput">Name*</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Appartment No 16 New Delhi 110044"
              value={e_address}
              onChange={handleEChange("e_address")}
            />
            <label htmlFor="floatingPassword">Address*</label>
          </div>
          <br />
          <h6>Additional Info</h6>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={e_email}
              onChange={handleEChange("e_email")}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="9919191919919"
              value={e_phone}
              onChange={handleEChange("e_phone")}
            />
            <label htmlFor="floatingPassword">Phone Number</label>
          </div>
          <br />

          <button className="btn btn-outline-warning" onClick={updateAddress}>
            Update Address
          </button>
          {JSON.stringify(evalues)}
        </>
      )}
      {displayCards()}
    </Base>
  );
};

export default Home;
