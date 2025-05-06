import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/userModel';

export interface AppError {
    status?: number;
    message?: string;
    stack?: string;
  }

const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;