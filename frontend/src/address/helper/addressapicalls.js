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
