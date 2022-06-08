
import axios from "axios";
import { genToken } from "../../auth/helper/authapicalls";
const { API } = require("../../backend");

export const getAllUserAddresses = async () => {
  const user = await genToken();
  return axios
    .get(`${API}/addresses/${user.data.userId}`, {
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${user.data.token}`,
        withCredentials: true
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const createAddress = async (address) => {
  const user = await genToken();
  return axios
    .post(
      `${API}/create/${user.data.userId}`,
      {
        ...address
      },
      {
        headers: {
          Accept: "application/json",
          ContentType: "application/json",
          Authorization: `Bearer ${user.data.token}`,
          withCredentials: true
        }
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};


export const updateAddress=async(addressId,address)=>{
  const user = await genToken();
  return axios.put(`${API}/update/${user.data.userId}/${addressId}`,{
     ...address
  },
  {
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${user.data.token}`,
      withCredentials: true
    }
  }).then((res) => {
    return res.data;
  })
  .catch((err) => console.log(err));
}

export const deleteAddress=async (addressId)=>{
     const user = await genToken();
     return axios.delete(`${API}/delete/${user.data.userId}/${addressId}`,{
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${user.data.token}`,
        withCredentials: true
      }
     }).then((res)=>{
       return res.data;
     }).catch((err)=>{
       console.log(err)
     })
}

