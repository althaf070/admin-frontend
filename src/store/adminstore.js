import { create } from "zustand";
import axios from "axios";
import {SERVER_URL} from '../lib/serverurl'

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${SERVER_URL}/register`, {
        username,
        email,
        password,
      });
      set({
        user: response.data.admin,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      const error = err.response?.data?.message || "Error signing up";
      set({
        error,
        isLoading: false,
      });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.admin,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      const error = err.response?.data?.message || "Error logging in";
      set({
        error,
        isLoading: false,
      });
      throw err;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${SERVER_URL}/check`);
      set({ user: response.data.admin, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      console.log(error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  logout:async()=> {
    set({isLoading:true,error:null})
    try {
        await axios.post(`${SERVER_URL}/logout`)
        set({isAuthenticated:false,isLoading:false})
    } catch (error) {
        console.log("Error in logout",error);    
    }
  }
}));
