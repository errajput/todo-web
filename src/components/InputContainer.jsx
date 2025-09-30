"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

export default function InputContainer({
  inputValue,
  setInputValue,
  handleAdd,
}) {
  return (
    <div className="flex flex-row  gap-3 justify-center ">
      <input
        type="text"
        placeholder="Enter a task..."
        className="flex-1 border border-purple-200 rounded-md px-2 py-1
                   outline-none focus:ring-2 focus:ring-purple-200 
                   bg-white text-purple-700 placeholder:text-purple-300
                   text-sm sm:text-sm w-full "
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
        className=" rounded-md bg-purple-50 text-purple-700 border border-purple-200 
                   hover:bg-purple-200 cursor-pointer transition-colors duration-200 
                   flex items-center justify-center  w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-2"
      >
        <PlusIcon className="h-3 w-3 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
