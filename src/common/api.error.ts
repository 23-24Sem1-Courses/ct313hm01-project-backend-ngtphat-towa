import Joi from "joi";

export default class ApiError extends Error {
  type?: string;
  statusCode?: number;
  message: string;
  details?: string[];
  headers?: Record<string, unknown>;

  constructor(
    type: string,
    statusCode: number = 500,
    message: string,
    details?: string[],
    headers?: Record<string, unknown>
  ) {
    super(message);
    this.type = type ?? "";
    this.statusCode = statusCode;
    this.message = message ?? "";
    this.details = details ?? [];
    this.headers = headers ?? {};
  }
}
export class JoiValidationError extends ApiError {
  constructor(error: Joi.ValidationError) {
    super(
      "JoiValidationError",
      400,
      error.message,
      error.details.map(
        (detail) =>
          `${detail.message}. Invalid parameter ${detail.path.join(
            "."
          )} value: ${detail.context?.value}`
      )
    );
  }
}

export class MissingRequiredParameterErrorResponse extends ApiError {
  constructor(parameter: string) {
    super(
      "MissingRequiredParameterError",
      400,
      `Missing required parameter ${parameter}`
    );
  }
}

export class InvalidParameterErrorResponse extends ApiError {
  constructor(parameter: string, value: any) {
    super(
      "InvalidParameterError",
      400,
      `Invalid parameter ${parameter} value: ${String(value)}`
    );
  }
}

export class UnauthorizedAccessErrorResponse extends ApiError {
  constructor() {
    super("UnauthorizedAccessError", 401, "Unauthorized access");
  }
}

export class ForbiddenAccessErrorResponse extends ApiError {
  constructor() {
    super("ForbiddenAccessError", 403, "Forbidden access");
  }
}

export class ResourceNotFoundErrorResponse extends ApiError {
  constructor(resource: string = "") {
    super("ResourceNotFoundError", 404, `Resource ${resource} not found`);
  }
}
export class ConflictErrorResponse extends ApiError {
  constructor(message: string = "Duplicated resource was found") {
    super("ConflictError", 409, message);
  }
}

export class MethodNotAllowedErrorResponse extends ApiError {
  constructor(allowedMethods: string[]) {
    super(
      "MethodNotAllowedError",
      405,
      `Method not allowed. Allowed methods: ${allowedMethods.join(", ")}`
    );
  }
}

export class DatabaseErrorResponse extends ApiError {
  constructor(error: Error) {
    super("DatabaseError", 500, "Database error", [], {
      error,
    });
  }
}

export function validateIdDTO(params: any = {}): number {
  const id = Number(params.id);

  if (isNaN(id)) {
    throw new InvalidParameterErrorResponse("id", id);
  }

  return id;
}
