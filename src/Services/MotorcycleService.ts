import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(
        motorcycle,
      );
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async listMotorcycles() {
    const motoODM = new MotorcycleODM();
    const motoList = await motoODM.listCars();
    const motoArray = motoList.map((motos) => this.createMotorcycleDomain(motos));
    return motoArray;
  }

  public async getMotoById(id: string) {
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.findById(id);
    if (moto !== undefined && moto.length === 0) throw new Error('Moto not found');
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');
    const motoArray = moto.map((motos) => this.createMotorcycleDomain(motos));
    return motoArray[0];
  }

  public isValidId(id: string): boolean {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return idRegex.test(id);
  }

  public async updateMoto(id: string, motoData: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.updateCar(id, motoData);
    if (moto === null) throw new Error('Moto not found');
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');
    const motoDomain = this.createMotorcycleDomain(moto);
    return motoDomain;
  }
}

export default MotorcycleService;