import { Router } from 'express';
import CarsController from '../Controllers/CarsController';
import MotoController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).listCars(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).getById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).updateCar(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotoController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotoController(req, res, next).listMotos(),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotoController(req, res, next).getById(),
);

routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotoController(req, res, next).updateCar(),
);

export default routes;