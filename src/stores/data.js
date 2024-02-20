import { defineStore } from 'pinia';
import axiosApiClient from "../axios";
export const useDataStore = defineStore({
  id: "search",
  state: () => ({
    searchText: '',
    searchResults: [],
    loadingState: false
  }),
  getters: {},
  actions: {
     

  },
  persist: true,
});
