import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashArrowUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Table = ({ data, deleteTask }) => {
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    deleteTask(id);
  };

  const editHandler = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <div>
      <div className="formContainer">
        <div class="relative overflow-x-auto">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Due-Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </th>
                    <td class="px-6 py-4">{item.title}</td>
                    <td class="px-6 py-4">{item.description}</td>
                    <td class="px-6 py-4">{item.priority}</td>
                    <td class="px-6 py-4">{item.status}</td>
                    <td class="px-6 py-4">{item.dueDate}</td>
                    <td class="px-6 py-4">
                      <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        <div className="flex gap-4">
                          <span
                            className="text-green-500"
                            onClick={() => editHandler(item.id)}
                          >
                            <FaPencilAlt />
                          </span>
                          <span onClick={() => deleteHandler(item.id)}>
                            <FaTrashArrowUp className="text-red-500" />
                          </span>
                        </div>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
