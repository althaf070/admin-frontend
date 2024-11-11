import { create } from "zustand";
import axios from "axios";
import { SERVER_URL } from '../lib/serverurl';

export const useUserStore = create((set) => ({
  users: [], 
  error: null,
  isLoading: false,

  fetchuser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      set({ isLoading: false, users: response.data.user, error: null });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error.message });
    }
  },

}));
