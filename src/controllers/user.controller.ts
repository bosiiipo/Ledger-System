import {NextFunction, Request, Response} from 'express';
import {userService} from '../services/user';
import {
  sendSuccessResponse,
  StatusCode,
} from '../responses';

export class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        userId: req.params.userId,
      };

      const response = await userService.getUserById(params);

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
