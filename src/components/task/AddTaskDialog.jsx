import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import LoadingButton from "../LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  closeAddTaskDialog,
  openAddTaskDialog,
  selectAddTaskDialog,
  selectTaskData,
  updateTask,
} from "@/slices/taskSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  status: yup
    .string()
    .oneOf(["todo", "inProgress", "done"])
    .required("Status is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  dueDate: yup.date().required("Due date is required"),
});

const AddTaskDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addTaskDialog = useSelector(selectAddTaskDialog);
  const taskData = useSelector(selectTaskData);

  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("isEdit");
  const taskId = searchParams.get("task");

  const {
    control,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = watch();

  useEffect(() => {
    if (isEdit && taskId) {
      dispatch(openAddTaskDialog());
      reset({
        title: taskData?.title || "",
        description: taskData?.description || "",
        status: taskData?.status || "todo",
        priority: taskData?.priority || "medium",
        dueDate: taskData?.dueDate ? new Date(taskData.dueDate) : "",
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
      });
    }
  }, [taskId, isEdit]);

  const handleSubmit = () => {
    const payload = {
      ...form,
      dueDate: form?.dueDate ? new Date(form.dueDate).toISOString() : null,
    };

    setIsLoading(true);

    if (isEdit) {
      dispatch(updateTask({ taskId, payload }))
        .then((res) => {
          setIsLoading(false);
          dispatch(closeAddTaskDialog());
          navigate(`/home`);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      dispatch(addTask(payload))
        .then((res) => {
          setIsLoading(false);
          dispatch(closeAddTaskDialog());
          navigate(`/home`);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Drawer
      open={addTaskDialog?.open}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closeAddTaskDialog());
          navigate("/home");
        }
      }}
      key={"right"}
      direction={"right"}
    >
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="capitalize cursor-pointer hover:bg-gray-100"
          onClick={() => dispatch(openAddTaskDialog())}
        >
          <Plus className="w-2 h-2" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh] bg-white">
        <DrawerHeader>
          {isEdit ? (
            <DrawerTitle>Edit Task</DrawerTitle>
          ) : (
            <DrawerTitle>New Task</DrawerTitle>
          )}
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-y-6">
          <div className="flex flex-col justify-start items-start w-full">
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-status">
                    Status <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select a status" />
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
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-priority">
                    Priority <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
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
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Title <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your title..."
                    autoComplete="off"
                    className={cn(
                      "outline-none focus-visible:ring-0",
                      fieldState.invalid &&
                        "border-red-500 focus-visible:ring-red-500",
                    )}
                  />
                </Field>
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <Textarea {...field} placeholder="Type your message here." />
                </Field>
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <Controller
              name="dueDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Due Date <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          fieldState.invalid && "border-red-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP") // Ví dụ: April 2nd, 2026
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // KHÔNG cho chọn ngày trước ngày hiện tại
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>
        </div>
        <DrawerFooter>
          <LoadingButton
            onClick={handleSubmit}
            variant="default"
            className={"bg-black w-full text-white mt-6 py-6 cursor-pointer"}
            loading={isLoading}
            disabled={isLoading || !isValid}
          >
            Submit
          </LoadingButton>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTaskDialog;
