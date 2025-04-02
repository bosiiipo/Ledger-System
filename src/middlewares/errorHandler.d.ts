import * as express from 'express';
declare const _default: (err: Error & {
    type?: string;
}, req: express.Request, res: express.Response, next: express.NextFunction) => express.Response<any, Record<string, any>>;
export default _default;
