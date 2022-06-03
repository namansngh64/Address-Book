import { API } from "../../backend";
import axios from "axios";

export const signin = (user) => {
  return axios
    .post(
      `${API}/signin`,
      {
        email: user.email,
        password: user.password,
        isCookie: user.cookie
      },
      {
        Accept: "application/json",
        ContentType: "application/json",
        withCredentials: true
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));
};

export const genToken = () => {
  return axios
    .get(`${API}/gentoken`, {
      Accept: "application/json",
      ContentType: "application/json",
      withCredentials: true
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
