import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

class CarsService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarsODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async listCars() {
    const carODM = new CarsODM();
    const carList = await carODM.listCars();
    const carsArray = carList.map((cars) => this.createCarDomain(cars));
    return carsArray;
  }

  public async getCarById(id: string) {
    const carODM = new CarsODM();
    const car = await carODM.findById(id);
    if (car !== undefined && car.length === 0) throw new Error('Car not found');
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');
    const carArray = car.map((cars) => this.createCarDomain(cars));
    return carArray[0];
  }

  public isValidId(id: string): boolean {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return idRegex.test(id);
  }

  public async updateCar(id: string, carData: ICar) {
    const carODM = new CarsODM();
    const car = await carODM.updateCar(id, carData);
    if (car === null) throw new Error('Car not found');
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');
    const carDomain = this.createCarDomain(car);
    return carDomain;
    return car;
  }
}

export default CarsService;