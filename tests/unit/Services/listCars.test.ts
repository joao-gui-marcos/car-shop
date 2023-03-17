import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarsService from '../../../src/Services/CarsService';
import Car from '../../../src/Domains/Car';

const inputArray = [
  {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    model: 'MyModel',
    year: 2003,
    color: 'White',
    status: true,
    buyValue: 15.991,
    doorsQty: 2,
    seatsQty: 5,
  },
];

const INVALID_ID = '6170e4f7a3475db6f1069047';

describe('List all cars', function () {
  it('List all cars successfully', async function () {
    // Arrange
    const carListOutput = inputArray.map((item) => new Car(
      item,
    ));
    
    sinon.stub(Model, 'find').resolves(carListOutput);

    // Act
    const service = new CarsService();
    const result = await service.listCars();

    // Assert
    expect(result).to.be.deep.equal(carListOutput);

    sinon.restore();
  });

  it('Throw error when car does not exist', async function () {
    // Arrange
    sinon.stub(Model, 'find').resolves([]);
  
    try {
      // Act
      const service = new CarsService();
      await service.getCarById(INVALID_ID);
      // If we reach this line, an error was not thrown, so the test should fail
      expect.fail('Error was not thrown');
    } catch (error: unknown) {
      // Assert
      if (error instanceof Error) {
        expect(error.message).to.be.equal('Car not found');
      }
    }
  
    sinon.restore();
  });

  it('Throws an error when called with an invalid MongoDB ID', async function () {
    sinon.stub(Model, 'find').resolves(undefined);
    const invalidId = 'not_a_valid_mongo_id';
    try {
      const service = new CarsService();
      await service.getCarById(invalidId);
      expect.fail('Error was not thrown');
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).to.be.equal('Invalid mongo id');
      }
    }
  
    sinon.restore();
  });
});