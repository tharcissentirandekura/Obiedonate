import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://tharapi.pythonanywhere.com/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export async function Form<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  requestData?: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = method === 'GET'
      ? await api.get<T>(`/${endpoint}`)
      : await api.post<T>(`/${endpoint}`, requestData);

    return {
      data: response.data
    };
  } catch (error) {
    const errorMessage = error instanceof AxiosError 
      ? error.response?.data?.message || error.message
      : 'An unexpected error occurred';

    return {
      data: [] as unknown as T,
      error: errorMessage
    };
  }
}