import { ResponseModel } from "../interfaces/Model/ResponseModel";

export const createSuccessResponse = <T>(
  data: T,
  message?: string
): ResponseModel<T> => ({
  success: true,
  data,
  message,
});

export const createErrorResponse = (
  error: string,
  message?: string
): ResponseModel<null> => ({
  success: false,
  error,
  message,
});
