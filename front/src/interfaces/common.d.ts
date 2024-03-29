export type BackendError = {
  error: string;
  message: string;
  statusCode: number;
};
export type TFetchState<T> = {
  isLoading: boolean;
  data: T | null;
  filteredData: T | null;
  error: string | null;
};
