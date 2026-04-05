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
    }
})

export const selectItems = (state) => state.tasks.items
export const selectAddTaskDialog = (state) => state.tasks.addTaskDialog

export const { setItem, openAddTaskDialog, closeAddTaskDialog } = taskSlice.actions

export default taskSlice.reducer