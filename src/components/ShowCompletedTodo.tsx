"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ShowCompletedTodoProps {
  setShowCompletedTodo: React.Dispatch<React.SetStateAction<boolean>>;
  showCompletedTodo: boolean;
}

const ShowCompletedTodo: React.FC<ShowCompletedTodoProps> = ({
  setShowCompletedTodo,
  showCompletedTodo,
}) => {
  return (
    <button
      onClick={() => setShowCompletedTodo(!showCompletedTodo)}
      className="mb-3 m-4 text-purple-700 px-2 transition cursor-pointer"
      aria-expanded={showCompletedTodo}
      aria-label="Toggle completed todos visibility"
    >
      <ChevronDownIcon
        className={`h-4 w-4 transform transition-transform duration-1000 ${
          showCompletedTodo ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
};

export default ShowCompletedTodo;
