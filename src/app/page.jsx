"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import InputContainer from "@/components/InputContainer.jsx";
import TodoItem from "@/components/TodoItem.jsx";
import ShowCompletedTodo from "@/components/ShowCompletedTodo.jsx";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/services/todos.api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showCompletedTodo, setShowCompletedTodo] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // Add / Edit
  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    try {
      if (editingId) {
        await updateTodo(editingId, { title: inputValue });
        setEditingId(null);
      } else {
        await addTodo(inputValue);
      }
      setInputValue("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding/updating todo:", err);
    }
  };

  // Toggle done
  const markDone = async (id, currentStatus) => {
    try {
      await updateTodo(id, { isDone: !currentStatus });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
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
