import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
// import IVehicle from '../Interfaces/IVehicle';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  // private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    super();
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async listCars(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<ICar[]> {
    return this.model.find({ _id: id });
  }

  public async updateCar(id: string, carData: ICar): Promise<ICar | null> {
    const updatedCar = await this.model.findByIdAndUpdate(id, carData, { new: true });
    return updatedCar;
  }
}

export default CarODM;