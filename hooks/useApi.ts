import { useState } from "react";
import axios, { Method, AxiosRequestHeaders } from "axios";

const apiClient = axios.create({
  baseURL: "https://myapp37.somee.com",
});

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async <T>(
    url: string,
    method: Method,
    data: any = null,
    headers: AxiosRequestHeaders = null
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true);
    try {
      const response = await apiClient({
        url,
        method,
        data,
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { apiCall, isLoading };
};

export default useApi;
