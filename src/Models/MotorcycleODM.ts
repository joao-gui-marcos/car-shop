import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
// import IVehicle from '../Interfaces/IVehicle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  // private schema: Schema;
  private model: Model<IMotorcycle>;

  constructor() {
    super();
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }

  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  // public async listMotorcycles(): Promise<IMotorcycle[]> {
  //   return this.model.find();
  // }

  public async listCars(): Promise<IMotorcycle[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<IMotorcycle[]> {
    return this.model.find({ _id: id });
  }

  public async updateCar(
    id: string, 
    motorcycleData: IMotorcycle,
  ): Promise<IMotorcycle | null> {
    const updatedMotorcycle = await this.model.findByIdAndUpdate(id, motorcycleData, { new: true });
    return updatedMotorcycle;
  }
}

export default MotorcycleODM;