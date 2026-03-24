import apiClient from "@/lib/apiClient";

export const authService = {
  login: async (data) => {
    try {
      const res = await apiClient.post(`/login`, data);

      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  },

  getCurrent: async () => {
    try {
      const res = await apiClient.get("/user/current");

      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  },
};
