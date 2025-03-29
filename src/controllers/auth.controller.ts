import {NextFunction, Request, Response} from 'express';
import {validate} from '../middlewares/validate';
import {sendSuccessResponse, StatusCode} from '../responses';
import jwt from 'jsonwebtoken';
import {config} from '../config'
import * as AuthSchema from '../validations/auth.schema';

export class AuthController {
  async getSignedToken(req: Request, res: Response, next: NextFunction) {
      try {
        const params = await validate(AuthSchema.GetTokenSchema, {
          email: req.body.email,
          password: req.body.password,
        });
  
        console.log({params})
  
        const response = jwt.sign(
          params,
          config.secret as string,
          { expiresIn: 86400 }
        );
  
        return sendSuccessResponse(
          res,
          StatusCode.OK,
          'Token generated successfully',
          {token: response}
        );
      } catch (error) {
        return next(error);
      }
  }

  async decodeToken(req: Request) {
    try {
      // Request for token
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('Token not provided');
      }
      // Grab token
      const jwtToken = token.split(' ')[1];
      //   Decode token
      const decoded = jwt.verify(jwtToken, config.secret as string);
      return decoded;
    } catch (e) {
      console.log(e);
      throw new Error('Invalid Auth Token');
    }
  }
}

export default AuthController;