import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editTaskAPI, getTaskByIdAPI } from "../Api/Todo_service";
import Logout from "./Logout";

const TodoEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todoDetail, settodoDetail] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  const fetchData = async () => {
    let response = await getTaskByIdAPI(id);
    if (response.success) {
      settodoDetail({
        title: response.data.title,
        description: response.data.description,
        priority: response.data.priority,
        status: response.data.status,
        dueDate: response.data.dueDate,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editTaskAPI(todoDetail, id);
      if (response.success) {
        navigate("/todos");
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const changeHandler = (e) => {
    settodoDetail({ ...todoDetail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="Updatecontainer mx-auto bg-gray-800">
        <Logout />
        <div className="text-center">
          <h1 className="text-white font-semibold text-2xl font-mono title">
            Todo Task Manager
          </h1>
        </div>
        <div className="text-center">
          <h1 className="heading pt-2 ">Edit Todo</h1>
        </div>
        <div className="formContainer">
          <form class="space-y-4 editForm" onSubmit={handleSubmit}>
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={todoDetail.title}
                onChange={changeHandler}
                placeholder="title"
                required
              />
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="description"
                value={todoDetail.description}
                onChange={changeHandler}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                for="priority"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Priority
              </label>
              <select
                id="priority"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="priority"
                value={todoDetail.priority}
                onChange={changeHandler}
              >
                <option selected value="">
                  Select
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label
                for="status"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                id="status"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="status"
                value={todoDetail.status}
                onChange={changeHandler}
              >
                <option selected value="">
                  Select
                </option>
                <option value="pending">Pending</option>
                <option value="progress">Progess</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label
                for="dueDate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="duedate"
                value={todoDetail.dueDate}
                onChange={changeHandler}
                required
              />
            </div>
            <button type="submit" className="btnColor updateBtn">
              Edit Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoEdit;
