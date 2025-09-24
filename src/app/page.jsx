"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import InputContainer from "@/components/InputContainer.jsx";
import TodoItem from "@/components/TodoItem.jsx";
import ShowCompletedTodo from "@/components/ShowCompletedTodo.jsx";
import { addTodo, getTodos } from "@/services/todos.api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showCompletedTodo, setShowCompletedTodo] = useState(true);

  const fetchTodos = async () => {
    try {
      // const token = localStorage.getItem("token");

      // const res = await fetch("http://localhost:5000/todos", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // if (!res.ok) {
      //   throw new Error(`Error ${res.status}: ${res.statusText}`);
      // }

      // const data = await res.json();
      // console.log("TODOS", data);
      const todos = await getTodos();

      setTodos(todos || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  //NOTE:  Add Todo
  const handleAdd = async () => {
    if (inputValue.trim() === "") return;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to add todos.");
      return;
    }

    if (editingId) {
      //NOTE: Update todo
      const res = await fetch(`http://localhost:5000/todos/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: inputValue }),
      });
      const data = await res.json();
      fetchTodos();
      // setTodos((prev) =>
      //   prev.map((t) => (t._id === editingId ? data.updatedTodo : t))
      // );
      setEditingId(null);
      setInputValue("");
    } else {
      await addTodo(inputValue);
      //NOTE: Add new TODO
      // const res = await fetch("http://localhost:5000/todos", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({ title: inputValue }),
      // });
      // const newTodo = await res.json();

      // setTodos([newTodo, ...todos]);
      fetchTodos();
      setInputValue("");
    }
  };

  // Toggle complete
  const markDone = (id, currentStatus) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isDone: !currentStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data:", data);
        fetchTodos();
        // const updatedOne = todos.map((item) =>
        //   item._id === id ? data.updatedTodo : item
        // );
        // console.log("Update check", updatedOne);

        // setTodos(updatedOne);
      });
  };

  // Delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Edit

  const handleEdit = async (id) => {
    try {
      const item = todos.find((t) => t._id === id);
      // console.log("Found item:", item);
      if (!item) return;
      setInputValue(item.title);
      setEditingId(id);
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-blue-800 m-6 text-center">
        Add your Todos here
      </h1>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-blue-100">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">
          Todo App
        </h1>

        {/* Input + Add */}
        <InputContainer
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAdd={handleAdd}
        />

        {/* Active Todos */}
        <div>
          {todos
            .filter((t) => t && !t.isDone)
            .map((v) => (
              <TodoItem
                key={v._id || v.id}
                v={v}
                markDone={() => markDone(v._id, v.isDone)}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
        </div>

        {/* Completed Todos */}
        {todos.some((t) => t.isDone) && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-blue-900 font-semibold ml-4">Completed</h2>
              <ShowCompletedTodo
                setShowCompletedTodo={setShowCompletedTodo}
                showCompletedTodo={showCompletedTodo}
              />
            </div>
            {showCompletedTodo &&
              todos
                .filter((t) => t && t.isDone)
                .map((todo) => (
                  <TodoItem
                    key={todo._id}
                    v={todo}
                    markDone={() => markDone(todo._id, todo.isDone)}
                    handleDelete={() => handleDelete(todo._id)}
                    handleEdit={() => handleEdit(todo._id, todo.title)}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
