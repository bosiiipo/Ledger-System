import {NextFunction, Request, Response} from 'express';
import {sendSuccessResponse, StatusCode} from '../responses';
import { jwtController } from '../services/jwt';
import * as AuthService from '../services/auth'

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
}

export default AuthController;