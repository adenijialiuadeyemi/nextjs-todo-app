import axios from "axios";
import React from "react";

const Todo = ({ todo, index, handleDelete, completeTodo }) => {
  return (
    <tr key={index} className="border-b border-gray-200">
      <td className="px-4 py-2">{index + 1}</td>
      <td className={`px-4 py-2 ${todo.isCompleted ? "line-through" : ""}`}>
        {todo.title}
      </td>
      <td
        className={`px-4 py-2 max-sm:hidden ${
          todo.isCompleted ? "line-through" : ""
        }`}
      >
        {todo.description}
      </td>
      <td className="px-4 py-2 max-sm:hidden">
        {todo.isCompleted ? "Completed" : "Pending"}
      </td>
      <td className="px-4 py-2 flex gap-1 justify-center">
        <button
          className="px-4 py-2 bg-red-500 text-white"
          onClick={() => handleDelete(todo._id)}
        >
          Delete
        </button>
        {todo.isCompleted ? (
          ""
        ) : (
          <button
            onClick={() => completeTodo(todo._id)}
            className="px-4 py-2 bg-green-500 text-white"
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
