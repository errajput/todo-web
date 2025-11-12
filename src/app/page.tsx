"use client";

import { JSX, useEffect, useState } from "react";

import InputContainer from "@/components/InputContainer";
import TodoItem from "@/components/TodoItem";
import ShowCompletedTodo from "@/components/ShowCompletedTodo";
import ConfirmDialog from "@/components/ConfirmDialog";

import {
  addTodo,
  deleteTodo,
  getTodos,
  reOrderTodo,
  Todo,
  updateTodo,
} from "@/services/api";

export default function Home(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCompletedTodo, setShowCompletedTodo] = useState<boolean>(true);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  //  Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    setLoading(true);
    try {
      const todosData = await getTodos();
      setTodos(todosData || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Add / Edit Todo
  const handleAdd = async (): Promise<void> => {
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

  //  Toggle done
  const markDone = async (
    id: string,
    currentStatus: boolean
  ): Promise<void> => {
    try {
      await updateTodo(id, { isDone: !currentStatus });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  //  Delete flow
  const handleDelete = (id: string): void => setTodoToDelete(id);

  const confirmDelete = async (): Promise<void> => {
    if (!todoToDelete) return;

    try {
      await deleteTodo(todoToDelete);
      setTodos((prev) => prev.filter((t) => t._id !== todoToDelete));
    } catch (err) {
      console.error("Error deleting todo:", err);
    } finally {
      setTodoToDelete(null);
    }
  };

  const cancelDelete = (): void => setTodoToDelete(null);

  //  Edit Todo
  const handleEdit = (id: string): void => {
    const item = todos.find((t) => t._id === id);
    if (!item) return;
    setInputValue(item.title);
    setEditingId(id);
  };

  //  Drag and Drop Reordering
  const handleDrop = (dropId: string): void => {
    if (!draggingId) return;

    const newTodos = [...todos];
    const draggingIndex = newTodos.findIndex((t) => t._id === draggingId);
    const dropToIndex = newTodos.findIndex((t) => t._id === dropId);

    if (draggingIndex === -1 || dropToIndex === -1) return;

    // Swap the two todos
    const draggingTodo = newTodos[draggingIndex];
    newTodos[draggingIndex] = newTodos[dropToIndex];
    newTodos[dropToIndex] = draggingTodo;

    const updatedTodoOrder = [
      { _id: draggingId, order: dropToIndex },
      { _id: dropId, order: draggingIndex },
    ];

    reOrderTodo(updatedTodoOrder)
      .then(() => console.log("Order updated"))
      .catch((e) => console.error("Error updating order:", e));

    setTodos(newTodos);
  };

  return (
    <div>
      <div className="max-w-lg mx-auto mt-2 sm:mt-2 p-3 sm:p-6 bg-white shadow-lg rounded-lg border border-purple-200">
        {/* Input + Add */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <InputContainer
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAdd={handleAdd}
          />
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>{/* Todos list here */}</>
          )}
        </div>

        {/* Active Todos */}
        <div className="mt-4 space-y-3">
          {todos
            .filter((t) => t && !t.isDone)
            .reverse()
            .map((v) => (
              <TodoItem
                key={v._id}
                v={v}
                markDone={() => markDone(v._id, v.isDone)}
                handleDelete={() => handleDelete(v._id)}
                handleEdit={() => handleEdit(v._id)}
                setDraggingId={setDraggingId}
                handleDropDrag={handleDrop}
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
                      handleEdit={() => handleEdit(todo._id)}
                      responsive
                      setDraggingId={function (id: string): void {
                        throw new Error("Function not implemented.");
                      }}
                      handleDropDrag={function (id: string): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {todoToDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this todo?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
