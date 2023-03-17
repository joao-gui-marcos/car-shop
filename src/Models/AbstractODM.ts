import {

  Schema,
  
} from 'mongoose';
// import IVehicle from '../Interfaces/IVehicle';

abstract class AbstractODM<T> {
  protected schema: Schema;
  // private model: Model<IVehicle>;

  constructor() {
    this.schema = new Schema<T>();
    //   {
    //   model: { type: String, required: true },
    //   year: { type: Number, required: true },
    //   color: { type: String, required: true },
    //   status: { type: Boolean, required: false },
    //   buyValue: { type: Number, required: true },
    // }
    // ;
  // this.model = models.Car || model('Car', this.schema);
  }

  // public abstract create(car: T): Promise<T>;

  // public abstract listCars(): Promise<T[]>;

  // public abstract listMotorcycles(): Promise<IVehicle[]>; 

  // public abstract findById(id: string): Promise<T[]>;

  // public abstract updateCar(id: string, carData: T): Promise<T | null>;
}

export default AbstractODM;