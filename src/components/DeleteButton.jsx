"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-200 
                 px-2 py-1 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center"
      aria-label="Delete todo"
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  );
}
