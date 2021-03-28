import { Request, Response } from 'express';

import db from '../database/connection';

export default class FinancesController {
    
    async index(request: Request, response: Response) {
        const filters = request.query;

        const id_user = filters.id_user as string;

        if (!filters.id_user) {
            return response.status(400).json({
                error: 'Missing filters to search finances'
            })
        }

        const finances = await db('finances')
            .where('finances.id_user', '=', id_user)
            .orderBy('finances.id', 'desc');

        return response.json(finances);
    }
    
    async create(request: Request, response: Response) {
        const {
            title,
            value,
            id_user,
            id_type
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx('finances').insert({
                title,
                value,
                id_user,
                id_type
            })
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while creating new finance'
            })
        }
    }

    async delete(request: Request, response: Response) {
        const filters = request.query;

        const id = filters.id as string;
    
        const trx = await db.transaction();
    
        try {
            await trx('finances').delete().where('finances.id', '=', id);
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while deleting finance'
            })
        }
    }

    async update(request: Request, response: Response) {
        const {
            id,
            title,
            value,
            id_user,
            id_type
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx('finances').update({
                title,
                value,
                id_user,
                id_type
            }).where('finances.id', '=', id);
            
            await trx.commit();
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while updating finance'
            })
        }
    }
}