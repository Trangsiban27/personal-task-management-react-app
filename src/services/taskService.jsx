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
};
