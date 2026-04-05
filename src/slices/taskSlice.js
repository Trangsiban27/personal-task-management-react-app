import { taskService } from "@/services/taskService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (pagination) => {
        try {
            const res = await taskService.getTasks(pagination)

            return res
        } catch (err) {
            console.log('err: ', err)
        }
    }
)

export const updateTaskStatus = createAsyncThunk(
    'tasks/updateStatus',
    async (payload) => {
        try {
            const res = await taskService.updateTaskStatus(payload?.taskId, payload?.status)

            return res
        } catch (err) {
            console.log('err: ', err)
        }
    }
)

export const addTask = createAsyncThunk(
    'task/addTask',
    async (payload) => {
        try {
            const res = await taskService.addTask(payload)

            return res
        } catch (err) {
            console.log('err: ', err)
        }
    }
)

export const getTask = createAsyncThunk(
    'task/getTask',
    async (taskId) => {
        try {
            const res = await taskService.getTask(taskId)

            return res
        } catch (err) {
            console.log('err: ', err)
        }
    }
)

export const updateTaskPriority = createAsyncThunk(
    'task/updateTaskPriority',
    async (payload) => {
        try {
            const res = await taskService.updateTaskPriority(payload?.taskId, payload?.priority)

            return res
        } catch (err) {
            console.log('err: ', err)
        }
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        items: {
            todo: [],
            inProgress: [],
            done: []
        },
        addTaskDialog: {
            open: false
        },
        task: {
            data: null,
            open: false
        }
    },
    reducers: {
        setItem: (state, action) => {
            state.items = action.payload
        },
        openAddTaskDialog: (state, action) => {
            state.addTaskDialog.open = true
        },
        closeAddTaskDialog: (state, action) => {
            state.addTaskDialog.open = false
        },
        openTaskDialog: (state, action) => {
            state.task.open = true
        },
        closeTaskDialog: (state, action) => {
            state.task.open = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload?.metadata?.tasks ?? []

            state.tasks.forEach((task) => {
                const status = task?.status

                state?.items[status].push(task)
            })
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            console.log('res: ', action.payload)
            const newTask = action.payload?.metadata

            state.tasks.push(newTask)
            state.items[newTask.status].push(newTask)
        })
        builder.addCase(getTask.fulfilled, (state, action) => {
            state.task.data = action.payload?.metadata
        })
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            const newStatus = action.payload?.metadata?.status
            const oldStatus = state.task?.data?.status

            const taskId = action.payload?.metadata?._id

            const taskIndex = state.tasks.findIndex((task) => task._id === taskId)

            if (taskIndex !== -1) {
                state.tasks[taskIndex].status = newStatus
                state.items[newStatus].push(state.tasks[taskIndex])
            }

            state.items[oldStatus] = state.items[oldStatus].filter((task) => task._id !== taskId)

            state.task.data.status = newStatus
        })
        builder.addCase(updateTaskPriority.fulfilled, (state, action) => {
            const newPriority = action?.payload?.metadata?.priority

            state.task.data.priority = newPriority
        })
    }
})

export const selectItems = (state) => state.tasks.items
export const selectAddTaskDialog = (state) => state.tasks.addTaskDialog
export const selectTaskDetailDialog = (state) => state.tasks.task
export const selectTaskData = (state) => state.tasks.task.data

export const {
    setItem,
    openAddTaskDialog,
    closeAddTaskDialog,
    openTaskDialog,
    closeTaskDialog
} = taskSlice.actions

export default taskSlice.reducer