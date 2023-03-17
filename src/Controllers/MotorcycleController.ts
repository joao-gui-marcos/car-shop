import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotoController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    if (!this.req.body.status) {
      moto.status = false;
    }

    try {
      const newMoto = await this.service.createMotorcycle(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async listMotos() {
    try {
      const motoList = await this.service.listMotorcycles();
      return this.res.status(200).json(motoList);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const car = await this.service.getMotoById(id);
      return this.res.status(200).json(car);
    } catch (error: unknown) {
      this.handleGetByIdError(error);
    }
  }

  private handleGetByIdError(error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Moto not found') {
        this.res.status(404).json({ message: 'Motorcycle not found' });
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
      const car = await this.service.updateMoto(id, carData);
      return this.res.status(200).json(car);
    } catch (error: unknown) {
      this.handleGetByIdError(error);
    }
  }
}

export default MotoController;