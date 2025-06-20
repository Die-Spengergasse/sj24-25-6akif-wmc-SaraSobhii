import axios from "axios";
import axiosInstance from "../utils/axiosInstance"; 

export type ErrorResponse = {
  errorMessage: string;
  status?: number;
};

export function createErrorResponse(e: unknown): ErrorResponse {
  if (axios.isAxiosError(e)) {
    return {
      errorMessage: e.response?.data?.detail || e.message,
      status: e.response?.status,
    };
  }

  return {
    errorMessage: (e as Error).message || "Unknown error",
  };
}

export { axiosInstance };
