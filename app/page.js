"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: { mongoId: id },
    });
    toast.success(response.data.msg);
    fetchTodos();
  };

  const completeTodo = async (id) => {
    const response = await axios.put("/api", {}, { params: { mongoId: id } });
    toast.success(response.data.msg);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      // api code
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" autoClose={2500} />
      <form
        onSubmit={onSubmitHandle}
        className="border border-gray-200 rounded flex items-center flex-col gap-2 w-[80%] max-w-[600px] mt-14 px-2 mx-auto"
      >
        <input
          onChange={onchangeHandler}
          value={formData.title}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="mt-2 rounded px-3 py-2 border-2 border-gray-200 w-full"
        />
        <textarea
          onChange={onchangeHandler}
          value={formData.description}
          name="description"
          placeholder="Enter description"
          className="px-3 rounded py-2 border-2 border-gray-200 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-sky-600 rounded py-3 px-11 text-white"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-14 w-full md:w-[60%] md:mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 w-[40px] text-center py-3">
                Id
              </th>
              <th scope="col" className="px-6 w-[100px] text-center py-3">
                Title
              </th>
              <th scope="col" className="px-6 w-[200px] text-center py-3">
                Description
              </th>
              <th scope="col" className="px-6 w-[100px] text-center py-3">
                Status
              </th>
              <th scope="col" className="px-6 w-[100px] text-center py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
