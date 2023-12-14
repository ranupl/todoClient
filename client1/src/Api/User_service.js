import axios from "axios";
import Context from "../Context/Local";

export const registerUserAPI = async (userDetails) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const details = {
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      username: userDetails.username,
      password: userDetails.password,
    };

    const { data } = await axios.post(
      `${Context}/api/register`,
      details,
      config
    );

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUserAPI = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${Context}/api/login`,
      { email, password },
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
