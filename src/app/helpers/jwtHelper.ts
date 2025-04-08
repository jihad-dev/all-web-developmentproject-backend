import jwt from 'jsonwebtoken';
export const createToken = (
    payload: Record<string, unknown>,
    secret: string,
    expireTime: string
): string => {
    return jwt.sign(payload, secret as string, {
        expiresIn: expireTime
    });
};

export const verifyToken = (token: string, secret: string): jwt.JwtPayload => {
    return jwt.verify(token, secret) as jwt.JwtPayload;
}; 