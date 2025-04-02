import { NextFunction, Request, Response } from 'express';
export declare class WalletController {
    createWallet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    topUpWallet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    sendMoney(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getWalletById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
