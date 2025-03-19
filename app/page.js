"use client";
import Todo from "@/Components/Todo";
import axios from "axios";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api");
      setTodoData(response.data.todos);
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);

      toast.success(response.data.msg);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api", {
        params: {
          mongoId: id,
        },
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error("Error deleting the todo");
    }
  };
  const completeTodo = async (id) => {
    try {
      const response = await axios.put(
        "/api",
        {},
        {
          params: {
            mongoId: id,
          },
        }
      );
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      console.log("Error in completeTodo function");
    }
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="w-[80%] max-w-[600px] mx-auto flex flex-col items-start mt-6"
      >
        <input
          placeholder="Enter Title"
          type="text"
          name="title"
          onChange={onChangeHandler}
          value={formData.title}
          className="w-full outline-none border border-gray-200 mb-4 px-4 py-2 text-md rounded"
        />
        <textarea
          placeholder="Enter Description"
          name="description"
          onChange={onChangeHandler}
          value={formData.description}
          className="w-full border border-gray-200 px-4 py-2 text-md rounded mb-4"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 px-6 py-3 text-white rounded shadow-lg"
        >
          Add Todo
        </button>
      </form>

      <div className="container px-4 md:px-16 mx-auto mt-10 pb-10">
        <table className="w-full ">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-sm text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">TITLE</th>
              <th className="px-4 py-2 max-sm:hidden">DESCRIPTION</th>
              <th className="px-4 py- max-sm:hidden">STATUS</th>
              <th className="px-4 py-2 text-center">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {todoData.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                index={index}
                handleDelete={handleDelete}
                completeTodo={completeTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
