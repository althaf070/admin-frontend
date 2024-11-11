import { create } from "zustand";
import axios from "axios";
import { SERVER_URL } from '../lib/serverurl';

export const useProviderStore = create((set) => ({
  providers: [], 
  error: null,
  isLoading: false,

  fetchProvider: async (verified) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${SERVER_URL}/providers?verified=${verified}`);
      set({ isLoading: false, providers: response.data.providers, error: null });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error.message });
    }
  },
  deleteProvider:async(id)=> {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        providers: state.providers.filter((provider) => provider._id !== id),
        isLoading: true,
      }));
      // Make the API request to delete the provider
      await axios.delete(`${SERVER_URL}/provider/delete/${id}`);
  
      // Once successful, stop loading
      set({ isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error.message });
    }
  }
}));
