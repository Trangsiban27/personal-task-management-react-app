import apiClient from "@/lib/apiClient";

export const taskService = {
  getTasks: async (pagination) => {
    try {
      const { limit, page } = pagination;

      const res = await apiClient.get(`/task?limit=${limit}&page=${page}`);

      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  },

  updateTaskStatus: async (taskId, status) => {
    try {
      console.log("status: ", status);
      const res = await apiClient.patch(`/task/${taskId}/status`, { status });

      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  },

  addTask: async (payload) => {
    try {
      const res = await apiClient.post("/task", payload);

      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  },
};
