import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatUppercaseFirstLetter } from "@/utils/formatText";
import { useDroppable } from "@dnd-kit/core";
import AddTaskDialog from "@/components/task/AddTaskDialog";

const Column = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "rgba(0,0,0,0.05)" : "transparent",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      className="flex flex-col gap-2 rounded-lg"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center justify-between px-1">
        <h4 className="text-left font-bold">
          {formatUppercaseFirstLetter(id)}
        </h4>

        {/* <Button
          variant="ghost"
          size="icon"
          aria-label="Add Task"
          className={"cursor-pointer"}
        >
          <Plus size={12} />
        </Button> */}
        <AddTaskDialog />
      </div>

      {children}
    </div>
  );
};

export default Column;
