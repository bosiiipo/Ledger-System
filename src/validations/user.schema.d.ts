import * as yup from 'yup';
export declare const CreateUserSchema: yup.ObjectSchema<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}, yup.AnyObject, {
    firstName: undefined;
    lastName: undefined;
    email: undefined;
    password: undefined;
}, "">;
