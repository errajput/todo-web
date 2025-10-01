"use client";

import CustomCheckBox from "./CustomCheckBox";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

const TodoItem = ({
  v,
  markDone,
  handleDelete,
  handleEdit,
  setDraggingId,
  handleDropDrag,
}) => {
  return (
    <div
      key={v.id}
      className="rounded-md text-purple-700"
      draggable
      onDragStart={() => setDraggingId(v.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDropDrag(v.id)}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <Squares2X2Icon className="h-2 w-2 sm:h-3 sm:w-3 text-purple-700 cursor-move" />
        <CustomCheckBox checked={v.isDone} onChange={() => markDone(v._id)} />
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
  );
};

export default TodoItem;
