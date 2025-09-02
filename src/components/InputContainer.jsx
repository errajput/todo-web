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
        className="flex-1 border border-blue-900 rounded-md px-3 py-2 
                   outline-none focus:ring-2 focus:ring-blue-400 
                   bg-white text-blue-900 placeholder:text-blue-400"
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
        className="px-3 py-2 rounded-md bg-blue-50 text-blue-900 border border-blue-200 
                   hover:bg-blue-200 cursor-pointer transition-colors duration-200 
                   flex items-center justify-center"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
