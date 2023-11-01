class ApiError extends Error {
  statusCode?: number;
  message: string;
  headers?: Record<string, unknown>;

  constructor(
    statusCode: number = 500,
    message: string,
    headers: Record<string, unknown> = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.headers = headers;
  }
}

export default ApiError;
