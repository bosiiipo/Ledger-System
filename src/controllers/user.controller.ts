import {NextFunction, Request, Response} from 'express';
import * as UserService from '../services/user';
import {
  sendSuccessResponse,
  StatusCode,
} from '../responses';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      const response = await UserService.createUser(params);

      return sendSuccessResponse(
        res,
        StatusCode.CREATED,
        'User created successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        userId: req.params.userId,
      };

      const response = await UserService.getUserById(params);

      return sendSuccessResponse(
        res,
        StatusCode.OK,
        'User fetched successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }
}
