import { API_URL } from "@/utils/constants";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: API_URL,
});
