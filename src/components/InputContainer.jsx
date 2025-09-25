"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

export default function InputContainer({
  inputValue,
  setInputValue,
  handleAdd,
}) {
  return (
    <div className="flex m-4 gap-2 justify-center mb-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter a task..."
        className="flex-1 border border-purple-300 rounded-md px-3 py-2 
                   outline-none focus:ring-2 focus:ring-purple-300 
                   bg-white text-purple-700 placeholder:text-purple-300"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <button
        onClick={handleAdd}
        aria-label="Add todo"
        className="px-3 py-2 rounded-md bg-purple-50 text-purple-800 border border-purple-200 
                   hover:bg-purple-200 cursor-pointer transition-colors duration-200 
                   flex items-center justify-center"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
