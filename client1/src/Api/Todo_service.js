import axios from "axios";
import Context from "../Context/Local";

export const addTaskAPI = async (details) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${Context}/api/createTodo`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllTaskAPI = async () => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${Context}/api/todos`, config);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTaskByIdAPI = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${Context}/api/todo/${id}`, config);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const editTaskAPI = async (details, id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${Context}/api/updateTodo/${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTaskAPI = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${Context}/api/deleteTodo/${id}`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
