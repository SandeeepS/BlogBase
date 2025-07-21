export interface ResponseModel<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}