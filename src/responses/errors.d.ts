import { StatusCode } from '.';
export declare class AppError extends Error {
    statusCode: StatusCode;
    data?: object;
    constructor(message: string, statusCode: StatusCode);
}
export declare class InternalError extends AppError {
    data: Record<string, unknown>;
    constructor(message: string, data: Record<string, unknown>);
}
export declare class ValidationError extends AppError {
    data?: object;
    constructor(message: string, data?: string[]);
}
export declare class AuthenticationError extends AppError {
    data?: object;
    constructor(message: string, data?: object);
}
export declare class AuthorizationError extends AppError {
    data?: object;
    constructor(message: string, data?: object);
}
export declare class ResourceNotFound extends AppError {
    data: Record<string, unknown>;
    constructor(message: string, query?: Record<string, unknown> | string);
}
export declare class UnprocessableEntityException extends AppError {
    data: Record<string, unknown>;
    constructor(message: string, query?: Record<string, unknown> | string);
}
