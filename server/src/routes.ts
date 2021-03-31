import express from 'express';
import FinancesController from './controllers/FinancesController';
import TypesController from './controllers/TypesController';
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';

const routes = express.Router();
const usersController = new UsersController();
const typesController = new TypesController();
const financesController = new FinancesController();
const authController = new AuthController();

routes.get('/users', usersController.index);
routes.post('/users', usersController.create);

routes.get('/types', typesController.index);
routes.post('/types', typesController.create);
routes.delete('/types', typesController.delete);
routes.put('/types', typesController.update);

routes.get('/finances', financesController.index);
routes.post('/finances', financesController.create);
routes.delete('/finances', financesController.delete);
routes.put('/finances', financesController.update);

routes.post('/auth', authController.authenticate);

export default routes;