import { create } from "zustand";
import axios from "axios";
import { SERVER_URL } from '../lib/serverurl';

export const useServicesStore = create((set) => ({
services: [], 
  error: null,
  isLoading: false,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${SERVER_URL}/services`);
      set({ isLoading: false, services: response.data.services, error: null });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error.message });
    }
  },
  deleteServices:async(id,providerId)=> {
    try {
        set((state)=>({
            services: state.services.filter((service)=> service._id !== id),
            isLoading:true
        }))
       await axios.delete(`${SERVER_URL}/services/delete/${id}`,{providerId})
       set({ isLoading: false, error: null });
    } catch (error) {
        console.log(error);
        set({ isLoading: false, error: error.message });
    }
  }

}));
