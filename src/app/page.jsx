"use client";

import { useEffect, useState } from "react";
import InputContainer from "@/components/InputContainer.jsx";
import TodoItem from "@/components/TodoItem.jsx";
import ShowCompletedTodo from "@/components/ShowCompletedTodo.jsx";
import { addTodo, deleteTodo, getTodos, updateTodo } from "@/services/api";

// Responsive Confirm Modal
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center sm:items-center sm:justify-center backdrop-blur-sm z-50">
    {/* Desktop Centered / Mobile Bottom Sheet */}
    <div
      className="bg-white w-full sm:w-auto rounded-t-xl sm:rounded-lg shadow-lg p-4 sm:p-6 
                    absolute bottom-0 sm:static"
    >
      <p className="mb-4 text-center text-sm sm:text-base">{message}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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
      if (!item) return;
      setInputValue(item.title);
      setEditingId(id);
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  };

  return (
    <div className=" sm:px-6 lg:px-8">
      <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-xl mx-auto mt-6 sm:mt-10 p-3 sm:p-6 bg-white shadow-lg rounded-lg border border-purple-200">
        {/* Input + Add (responsive layout) */}
        <div className="flex flex-col  gap-2 sm:gap-3">
          <InputContainer
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAdd={handleAdd}
          />
        </div>

        {/* Active Todos */}
        <div className="mt-4 space-y-3">
          {todos
            .filter((t) => t && !t.isDone)
            .map((v) => (
              <TodoItem
                key={v._id || v.id}
                v={v}
                markDone={() => markDone(v._id, v.isDone)}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                responsive
              />
            ))}
        </div>

        {/* Completed Todos */}
        {todos.some((t) => t.isDone) && (
          <div className="mt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowCompletedTodo(!showCompletedTodo)}
            >
              <h2 className="text-purple-700 font-semibold text-sm sm:text-base">
                Completed
              </h2>
              <ShowCompletedTodo
                setShowCompletedTodo={setShowCompletedTodo}
                showCompletedTodo={showCompletedTodo}
              />
            </div>
            {showCompletedTodo && (
              <div className="mt-2 space-y-3">
                {todos
                  .filter((t) => t && t.isDone)
                  .map((todo) => (
                    <TodoItem
                      key={todo._id}
                      v={todo}
                      markDone={() => markDone(todo._id, todo.isDone)}
                      handleDelete={() => handleDelete(todo._id)}
                      handleEdit={() => handleEdit(todo._id, todo.title)}
                      responsive
                    />
                  ))}
              </div>
            )}
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
