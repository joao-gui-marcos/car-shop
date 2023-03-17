import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarsService from '../../../src/Services/CarsService';
import Car from '../../../src/Domains/Car';

describe('Create car', function () {
  it('Create car succesfully', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(
      carInput,
    );
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarsService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });
});