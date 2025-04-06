import * as yup from 'yup';
import {ValidationError} from '../responses/errors';
import {Request, Response, NextFunction} from 'express';

export const validate =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, {abortEarly: false});
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return next(
          new ValidationError(
            'Please check your input and try again',
            error.errors
          )
        );
      }
      next(error);
    }
  };
