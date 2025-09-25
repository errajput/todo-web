"use client";

import CustomCheckBox from "./CustomCheckBox";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

const TodoItem = ({ v, markDone, handleDelete, handleEdit }) => {
  return (
    <div key={v.id} className="p-2 m-2 rounded-md text-purple-700">
      <div className="flex items-center gap-4">
        <Squares2X2Icon className="h-3 w-3 text-purple-700 cursor-move" />
        <CustomCheckBox checked={v.isDone} onChange={() => markDone(v._id)} />
        <p
          className={`flex-1 text-left ${
            v.isDone ? "line-through text-purple-300" : ""
          }`}
        >
          {v.title}
        </p>
        <div className="flex gap-2">
          {!v.isDone && <EditButton onClick={() => handleEdit(v._id)} />}
          <DeleteButton onClick={() => handleDelete(v._id)} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
