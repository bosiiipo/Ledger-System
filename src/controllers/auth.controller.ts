import {NextFunction, Request, Response} from 'express';
import {
  sendFailureResponse,
  sendSuccessResponse,
  StatusCode,
} from '../responses';
import {jwtController} from './jwt.controller';
import {authService} from '../services/auth';
import jwt from 'jsonwebtoken';
import {AuthorizationError} from '../responses/errors';

export class AuthController {
  async signIn(req: Request, res: Response) {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await authService.signInUser(params);

    return sendSuccessResponse(
      res,
      StatusCode.OK,
      'User signed in successfully',
      response
    );
  }

  async createUser(req: Request, res: Response) {
    const params = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await authService.createUser(params);

    return sendSuccessResponse(
      res,
      StatusCode.CREATED,
      'User created successfully',
      response
    );
  }

  async authorizeToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader)
        return sendFailureResponse(
          res,
          StatusCode.UNAUTHORIZED,
          'Authorization header not found'
        );

      const [bearer, token] = authHeader.split(' ');
      if (!(bearer?.toLowerCase() === 'bearer' && token))
        return sendFailureResponse(
          res,
          StatusCode.UNAUTHORIZED,
          'Invalid authorization header'
        );

      const decoded = await jwtController.verify(token);
      (req as any).user = decoded;
      return next();
    } catch (error) {
      throw new Error('Token Expired');
    }
  }
}

export default AuthController;
