"use client";

import React, { useState } from "react";
import CustomCheckBox from "./CustomCheckBox";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

// Define the shape of a Todo item
export interface Todo {
  _id: string;
  title: string;
  isDone: boolean;
}

// Define the props expected by TodoItem
export interface TodoItemProps {
  v: Todo;
  markDone: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  setDraggingId: (id: string) => void;
  handleDropDrag: (id: string) => void;
  responsive?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  v,
  markDone,
  handleDelete,
  handleEdit,
  setDraggingId,
  handleDropDrag,
  responsive = false,
}) => {
  const [loadingCheck, setLoadingCheck] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setLoadingCheck(true);
      await markDone(v._id);
    } catch (err) {
      console.error("Error toggling todo:", err);
    } finally {
      setLoadingCheck(false);
    }
  };

  return (
    <div className={`${responsive ? "flex-col sm:flex-row" : "flex-row"}`}>
      <div
        key={v._id}
        className="rounded-md text-purple-700"
        draggable
        onDragStart={() => setDraggingId(v._id)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDropDrag(v._id)}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <Squares2X2Icon className="h-2 w-2 sm:h-3 sm:w-3 text-purple-700 cursor-move" />
          {loadingCheck ? (
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CustomCheckBox checked={v.isDone} onChange={handleCheckboxClick} />
          )}
          <p
            className={`flex-1 text-left sm:text-base text-sm break-words ${
              v.isDone ? "line-through text-purple-300" : ""
            }`}
          >
            {v.title}
          </p>
          <div className="flex gap-2 sm:gap-2 justify-end sm:justify-start">
            {!v.isDone && <EditButton onClick={() => handleEdit(v._id)} />}
            <DeleteButton onClick={() => handleDelete(v._id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
