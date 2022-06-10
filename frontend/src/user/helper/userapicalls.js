import axios from "axios";
import { genToken } from "../../auth/helper/authapicalls";
import { API } from "../../backend";

export const getUser = async () => {
  const user = await genToken();
  return axios
    .get(`${API}/getuser/${user.data.userId}`, {
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

export const updateUser1 = async (user_p) => {
  const user = await genToken();
  return axios
    .put(
      `${API}/updateUser/${user.data.userId}`,
      {
        ...user_p
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
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};
