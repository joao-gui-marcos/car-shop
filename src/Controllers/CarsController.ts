import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarsService from '../Services/CarsService';

class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarsService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    if (!this.req.body.status) {
      car.status = false;
    }

    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async listCars() {
    try {
      const carList = await this.service.listCars();
      return this.res.status(200).json(carList);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const car = await this.service.getCarById(id);
      return this.res.status(200).json(car);
    } catch (error: unknown) {
      this.handleGetByIdError(error);
    }
  }

  private handleGetByIdError(error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Car not found') {
        this.res.status(404).json({ message: 'Car not found' });
      } else if (error.message.includes('Cast to ObjectId failed')) {
        this.res.status(422).json({ message: 'Invalid mongo id' });
      }
    } else {
      this.next(error);
    }
  }

  public async updateCar() {
    try {
      const { id } = this.req.params;
      const carData = this.req.body;
      const car = await this.service.updateCar(id, carData);
      return this.res.status(200).json(car);
    } catch (error: unknown) {
      this.handleGetByIdError(error);
    }
  }
}

export default CarsController;