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

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        items: {
            todo: [],
            inProgress: [],
            done: []
        },
    },
    reducers: {
        setItem: (state, action) => {
            state.items = action.payload
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
    }
})

export const selectItems = (state) => state.tasks.items

export const { setItem } = taskSlice.actions

export default taskSlice.reducer