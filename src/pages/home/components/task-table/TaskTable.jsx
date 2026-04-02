import React, { act, useEffect, useState } from "react";
import Column from "./Column";
import Item from "./Item";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  selectItems,
  setItem,
  updateTaskStatus,
} from "@/slices/taskSlice";
import { arrayMove } from "@dnd-kit/sortable";

const TaskTable = () => {
  const dispatch = useDispatch();
  const tasksData = useSelector(selectItems);

  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(getTasks({ limit: 10, page: 1 }));
  }, []);

  const findColumn = (id) => {
    if (tasksData[id]) return id;

    return Object.keys(tasksData)?.find((key) =>
      tasksData[key].some((item) => item?._id === id),
    );
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active?.id;
    const overId = over?.id;

    const activeCol = findColumn(activeId);
    const overCol = findColumn(overId);

    const currentTask = tasksData[activeCol]?.find(
      (item) => item?._id === activeId,
    );

    if (!activeCol || !overCol || activeCol === overCol) return;

    const newItems = {
      ...tasksData,
      [activeCol]: [...tasksData[activeCol]],
      [overCol]: [...tasksData[overCol]],
    };
    const activeIndex = newItems[activeCol]?.findIndex(
      (item) => item?._id === activeId,
    );

    const [movedItem] = newItems[activeCol]?.splice(activeIndex, 1);

    newItems[overCol]?.push({ ...movedItem, status: overCol });

    dispatch(setItem(newItems));
    setCurrentTask(currentTask);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active?.id;
    const overId = over?.id;

    const activeCol = findColumn(activeId);
    const overCol = findColumn(overId);

    //case 1
    if (activeCol && overCol && activeCol === overCol) {
      const oldIndex = tasksData[activeCol]?.findIndex(
        (item) => item?._id === activeId,
      );
      const newIndex = tasksData[overCol]?.findIndex(
        (item) => item?._id === overId,
      );

      if (oldIndex !== newIndex) {
        const newItems = {
          ...tasksData,
          [activeCol]: arrayMove(tasksData[activeCol], oldIndex, newIndex),
        };

        dispatch(setItem(newItems));
      }
    }

    //case 2: move to other col
    if (currentTask?.status !== overCol) {
      dispatch(updateTaskStatus({ taskId: activeId, status: overCol }));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(tasksData)?.map(([column, items]) => (
          <Column key={column} id={column}>
            {items.map((task, index) => (
              <Item
                key={task?._id}
                id={String(task?._id)}
                data={task}
                index={index}
                column={column}
              />
            ))}
          </Column>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskTable;
