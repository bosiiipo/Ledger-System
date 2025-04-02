import jwt from 'jsonwebtoken';
type JwtData = {
    userId: string;
};
declare class JwtController {
    sign(data: JwtData): Promise<string>;
    verify(jwtToken: string): Promise<string | jwt.JwtPayload>;
}
export declare const jwtController: JwtController;
export {};
