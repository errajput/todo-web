"use client";

import { useEffect, useState } from "react";
import InputContainer from "@/components/InputContainer.jsx";
import TodoItem from "@/components/TodoItem.jsx";
import ShowCompletedTodo from "@/components/ShowCompletedTodo.jsx";
import { addTodo, deleteTodo, getTodos, updateTodo } from "@/services/api";

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
      <p className="mb-4">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
        >
          No
        </button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showCompletedTodo, setShowCompletedTodo] = useState(true);
  const [todoToDelete, setTodoToDelete] = useState(null);

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
  const handleDelete = async (id) => setTodoToDelete(id);

  const confirmDelete = async () => {
    if (!todoToDelete) return;
    try {
      await deleteTodo(todoToDelete);
      setTodos((prev) => prev.filter((t) => t._id !== todoToDelete));
    } catch (err) {
      console.error(err);
    } finally {
      setTodoToDelete(null);
    }
  };
  const cancelDelete = () => setTodoToDelete(null);

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
      {/* <h1 className="text-3xl font-extrabold text-purple-700 m-6 text-center">
        Add your Todos here
      </h1> */}

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-purple-200">
        {/* <h1 className="text-2xl font-bold text-center text-purple-800 mb-4">
          Todo App
        </h1> */}

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
              <h2 className="text-purple-700 font-semibold ml-4">Completed</h2>
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
      {/* Confirmation Modal */}
      {todoToDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this todo?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
