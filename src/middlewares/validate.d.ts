import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
export declare const validate: (schema: yup.ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
