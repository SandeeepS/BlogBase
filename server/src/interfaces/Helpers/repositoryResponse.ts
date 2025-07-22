export interface IRepositoryResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}