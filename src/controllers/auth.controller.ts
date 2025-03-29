import {NextFunction, Request, Response} from 'express';
import {sendFailureResponse, sendSuccessResponse, StatusCode} from '../responses';
import { jwtController } from '../services/jwt';
import * as AuthService from '../services/auth'
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import { AuthorizationError } from '../responses/errors';


export class AuthController {
  async signIn (req: Request, res: Response) {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await AuthService.signInUser(params);
          
    return sendSuccessResponse(
      res,
      StatusCode.OK,
      'User signed in successfully',
      response
    );
  }

  async createUser (req: Request, res: Response) {
    const params = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await AuthService.createUser(params);
          
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
  
      jwtController.verify(token);
      return next();
    } catch (error) {
      let localError = null;
      if (error instanceof TokenExpiredError)
        localError = new AuthorizationError(
          'Token has expired. Please login again'
        );
      else if (error instanceof JsonWebTokenError)
        localError = new AuthorizationError('Invalid token');
      return next(localError || error);
    }
  }
}

export default AuthController;