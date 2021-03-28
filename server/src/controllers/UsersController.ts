import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import db from '../database/connection';

export default class UsersController {
    
    async index(request: Request, response: Response) {
        const users = await db('users');

        return response.json(users);
    }
    
    async create(request: Request, response: Response) {
        var {
            name,
            login,
            password
        } = request.body;
    
        const trx = await db.transaction();

        try {
            
            const hash = await bcrypt.hash(password, 10);
            password = hash;
            
            await trx('users').insert({
                name,
                login,
                password
            })
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while creating new user'
            })
        }
    }
}