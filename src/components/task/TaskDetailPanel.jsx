import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  closeTaskDialog,
  getTask,
  openAddTaskDialog,
  openTaskDialog,
  selectTaskData,
  selectTaskDetailDialog,
  updateTaskPriority,
  updateTaskStatus,
} from "@/slices/taskSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatDate } from "@/utils/formatDate";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";
import { is } from "date-fns/locale";

const TaskDetailPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("task");

  const taskDialog = useSelector(selectTaskDetailDialog);
  const taskData = useSelector(selectTaskData);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (taskId && taskDialog?.open) {
      setIsLoading(true);

      dispatch(getTask(taskId)).then(() => {
        setStatus(taskData?.status || "todo");
        setPriority(taskData?.priority || "medium");

        setIsLoading(false);
      });
    }
  }, [taskDialog?.open, taskId]);

  const handleChangeStatus = (value) => {
    dispatch(
      updateTaskStatus({
        taskId: taskData?._id,
        status: value,
      }),
    );
  };

  const handleChangePriority = (value) => {
    dispatch(
      updateTaskPriority({
        taskId: taskData?._id,
        priority: value,
      }),
    );
  };

  return (
    <Drawer
      open={taskDialog?.open}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closeTaskDialog());
          navigate("/home");
        }
      }}
      key={"right"}
      direction={"right"}
    >
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh] bg-white">
        <div className="flex items-center justify-between gap-2 p-4 border-b border-gray-500">
          <DrawerTitle className="mb-0">{taskData?.title}</DrawerTitle>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer h-8 w-8"
            onClick={() => {
              navigate(`/home?task=${taskData?._id}&isEdit=true`);
              dispatch(closeTaskDialog());
              dispatch(openAddTaskDialog());
            }}
          >
            <EditIcon size={18} />
          </Button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-y-6">
              <Field>
                <FieldLabel
                  htmlFor="form-rhf-demo-status"
                  className={"font-semibold"}
                >
                  Status
                </FieldLabel>
                <Select
                  value={taskData?.status}
                  onValueChange={(value) => {
                    setStatus(value);
                    handleChangeStatus(value);
                  }}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent className={"bg-white"}>
                    <SelectGroup>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="form-rhf-demo-priority"
                  className={"font-semibold"}
                >
                  Priority
                </FieldLabel>
                <Select
                  value={taskData?.priority}
                  onValueChange={(value) => {
                    setPriority(value);
                    handleChangePriority(value);
                  }}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent className={"bg-white"}>
                    <SelectGroup>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <div>
                <span className="font-semibold">Due date</span>
                <p className="text-sm text-gray-500">
                  {formatDate(taskData?.dueDate)}
                </p>
              </div>

              <div>
                <span className="font-semibold">Description</span>
                <p className="text-sm text-gray-500">{taskData?.description}</p>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TaskDetailPanel;
