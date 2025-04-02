import { Response } from 'express';
export declare enum StatusCode {
    CREATED = 201,
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    CONFLICT = 409,
    SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}
export declare const sendSuccessResponse: (response: Response, status: StatusCode, message?: string, data?: unknown) => Response<any, Record<string, any>>;
export declare const sendFailureResponse: (response: Response, status: StatusCode, message?: string, errors?: object) => Response<any, Record<string, any>>;
