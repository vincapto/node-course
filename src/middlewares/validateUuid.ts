import { validate as validateUuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';

const validateUuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!validateUuid(userId)) {
        res.status(400).json({ message: 'Invalid UUID format' });
    }

    next();
};

export default validateUuidMiddleware;