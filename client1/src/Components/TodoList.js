import React, { useState, useEffect } from "react";
import Table from "./Table";
import { addTaskAPI, deleteTaskAPI, getAllTaskAPI } from "../Api/Todo_service";
import Logout from "./Logout";

const TodoList = () => {
  const [isOpen, setisOpen] = useState(false);
  const [todoData, settodoData] = useState([]);
  const [filterData, setfilterData] = useState([]);

  const [todoDetail, settodoDetail] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  const changeHandler = (e) => {
    settodoDetail({ ...todoDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTaskAPI(todoDetail);
      if (response.success) {
        setisOpen(false);
        fetchAllTodo();
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchAllTodo = async () => {
    let response = await getAllTaskAPI();
    if (response.success) {
      console.log(response);
      settodoData(response.data);
      setfilterData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const deleteTask = async (id) => {
    let response = await deleteTaskAPI(id);
    if (response.success) {
      fetchAllTodo();
    } else {
      alert(response.message);
    }
  };

  const searchHandler = (e) => {
    let searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setfilterData(todoData);
    } else {
      let data = todoData.filter((item) => {
        let title = item.title.toLowerCase();
        return (
          searchValue && title.startsWith(searchValue) && searchValue !== title
        );
      });
      setfilterData(data);
    }
  };

  useEffect(() => {
    fetchAllTodo();
  }, []);

  return (
    <div className="container mx-auto bg-gray-800">
      <Logout />
      <div className="text-center">
        <h1 className="text-white font-semibold text-2xl font-mono title">
          Todo Task Manager
        </h1>
      </div>
      <div className="text-center">
        <h1 className="heading pt-2 ">Todo List</h1>
      </div>
      {/* <!-- Modal toggle --> */}
      <div className="toggle">
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="btnColor"
          type="button"
          onClick={() => setisOpen(true)}
        >
          Add Task
        </button>

        <form class="flex items-center">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 search"
              placeholder="Search title"
              onChange={searchHandler}
            />
          </div>
          <button type="submit" className="searchIcon">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>

      {/* <!-- Main modal --> */}
      {isOpen && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Task
                </h3>
                <button
                  type="button"
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    onClick={() => setisOpen(false)}
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div class="p-4 md:p-5">
                <form class="space-y-4" action="#" onSubmit={handleSubmit}>
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
                  <button type="submit" className="btnColor">
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* model */}
      <Table data={filterData} deleteTask={deleteTask} />
    </div>
  );
};

export default TodoList;
