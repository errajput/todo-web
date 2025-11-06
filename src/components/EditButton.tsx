"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import React from "react";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-200 
      px-1 py-1 sm:px-2 sm:py-1 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center"
      aria-label="Edit todo"
    >
      <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
};

export default EditButton;
