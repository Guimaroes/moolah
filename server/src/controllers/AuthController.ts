import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import db from '../database/connection';

const authConfig = require('../config/auth');

export default class UsersController {
    
    async authenticate(request: Request, response: Response) {
        const {
            login,
            password
        } = request.body;
        
        const user = await db('users')
            .where('users.login', '=', login)
            .first();

        if (!user) {
            return response.status(400).json({ error: 'Usuário não encontrado' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return response.status(400).json({ error: 'Senha errada' });
        }

        user.password = undefined;

        const token = jsonwebtoken.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        } );

        return response.json({user, token});
    }
}