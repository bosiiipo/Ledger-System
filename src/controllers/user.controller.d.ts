import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    createUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
