import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const authConfig = require('../config/auth');

export default function auth(request: Request, response: Response, next: () => {}) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return response.status(401).json({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).send({ error: 'Token malformatted' });
    }

    jsonwebtoken.verify(token, authConfig.secret, (err: any, decoded: any) => {
        if (err) return response.status(401).send( { error: 'Token invalid' });

        request.params.userId = decoded.id;

        return next();
    } )
}