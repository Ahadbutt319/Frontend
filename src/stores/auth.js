import { defineStore } from 'pinia';
import axiosApiClient from "../axios";
import createFormData from '../composables/createFormData'
export const useAuthStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      data: [],
      token: localStorage.getItem("token") || null, // Retrieve token from localStorage
    },
  }),
  getters: {},
  actions: {
    async login(data) {
      return axiosApiClient
        .post("/user/login", { ...data })
        .then((res) => {
          localStorage.setItem("token", res.data.data.access_token); // Store token in localStorage
          this.user.token = res.data.data.access_token
          this.user.data = res.data.data.user;
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    async singup(data) {
      return axiosApiClient
        .post("/user/register", { ...data })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.data.access_token);
          this.user.token = res.data.data.access_token
          this.user.data = res.data.data.user;
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    async logout() {
      localStorage.removeItem('token');
      // Reset the token in the state
      this.user.token = null;
      return true;
    },
  },
  persist: true,
});
