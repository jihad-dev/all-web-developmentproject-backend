import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwtHelper';
import config from '../config';

export const auth = (...requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized access'
                });
            }

            const verifiedUser = verifyToken(token, config.jwt.secret as string);

            if (!verifiedUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized access'
                });
            }

            if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden'
                });
            }

            req.user = verifiedUser;
            next();
        } catch (error) {
            next(error);
        }
    };
}; 