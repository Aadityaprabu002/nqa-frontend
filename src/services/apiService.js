import axios from "axios";
import { config } from "../config/env-config";
const apiService = {
  get: async (url) => {
    try {
      const response = await axios.get(`${config.backendGateway}${url}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error; // Rethrow the error for handling in the calling component
    }
  },
  post: async (url, data) => {
    try {
      console.log(config.backendGateway);
      const response = await axios.post(`${config.backendGateway}${url}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${url}:`, error);
      throw error; // Rethrow the error for handling in the calling component
    }
  },
};

export default apiService;
