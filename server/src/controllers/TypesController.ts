import { Request, Response } from 'express';

import db from '../database/connection';

export default class TypesController {
    
    async index(request: Request, response: Response) {
        const filters = request.query;

        const id_user = filters.id_user as string;

        if (!filters.id_user) {
            return response.status(400).json({
                error: 'Missing filters to search finances'
            })
        }

        const types = await db('types')
            .where('types.id_user', '=', id_user)
            .orderBy('types.is_income','desc')
            .orderBy('types.title');

        return response.json(types);
    }

    async create(request: Request, response: Response) {
        const {
            title,
            is_income,
            id_user
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx('types').insert({
                title,
                is_income,
                id_user
            })
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while creating new type'
            })
        }
    }

    async delete(request: Request, response: Response) {
        const filters = request.query;

        const id = filters.id as string;
    
        const trx = await db.transaction();
    
        try {
            await trx('types').delete().where('types.id', '=', id);
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while deleting type'
            })
        }
    }

    async update(request: Request, response: Response) {
        const {
            id,
            title,
            is_income,
            id_user
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx('types').update({
                title,
                is_income,
                id_user
            }).where('types.id', '=', id);
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while updating type'
            })
        }
    }
}