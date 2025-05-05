export type SuccessResponse<T> = {
  error: false;
  message?: string;
  data: T;
};

export type ErrorResponse = {
  error: true;
  message: string;
  data?: undefined;
};

export type RequestResponse<T> = SuccessResponse<T> | ErrorResponse;

export type SimpleRequestResponse =
  | { error: false; message?: string }
  | ErrorResponse;
