import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { formatDate } from "@/utils/formatDate";

const Item = ({ id, data, index, column }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      {...attributes}
      {...listeners}
      className="flex flex-col items-start gap-y-2 border border-gray-300 rounded-lg p-4 cursor-pointer"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex flex-col items-start">
        <span className="font-semibold">{data?.title}</span>
        <span className="text-xs text-gray-500">
          {formatDate(data?.dueDate)}
        </span>
      </div>

      <span className="text-xs text-gray-500 text-left">
        {data?.description}
      </span>
    </div>
  );
};

export default Item;
