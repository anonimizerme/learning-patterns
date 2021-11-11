import { expect } from 'chai'
import { MathInteger, MathOperation, MathOperationTypes } from '../index'

describe('Math Composite', function() {
  describe('MathInteger', function() {
    it('MathInteger calc should return correct value', function() {
      const int = new MathInteger(10)
      expect(int.calc()).to.be.a('number')
      expect(int.calc()).equals(10)
    });
  });

  describe('MathOperation', function() {
    it('MathOperation calc should add MathInteger', function() {
      const int = new MathInteger(10)
      const operation = new MathOperation(MathOperationTypes['+'])
      operation.add(int)
      expect(operation.get(0)).equals(int)
    });

    it('MathOperation calc should remove MathInteger', function() {
      const int = new MathInteger(10)
      const operation = new MathOperation(MathOperationTypes['+'])
      operation.add(int)
      operation.remove(int)
      expect(operation.get(0)).to.be.undefined
    });

    it('MathOperation calc should get MathInteger', function() {
      const int1 = new MathInteger(10)
      const int2 = new MathInteger(20)
      const operation = new MathOperation(MathOperationTypes['+'])
      operation.add(int1)
      operation.add(int2)
      expect(operation.get(1)).equals(int2)
    });
  });

  describe('MathOperation operations', function() {
    it('MathOperation calc [+] operation', function() {
      const int1 = new MathInteger(10)
      const int2 = new MathInteger(20)
      const int3 = new MathInteger(30)
      const operation = new MathOperation(MathOperationTypes['+'])
      operation.add(int1)
      operation.add(int2)
      operation.add(int3)
      expect(operation.calc()).equals(60)
    });

    it('MathOperation calc [-] operation', function() {
      const int1 = new MathInteger(10)
      const int2 = new MathInteger(20)
      const int3 = new MathInteger(30)
      const operation = new MathOperation(MathOperationTypes['-'])
      operation.add(int1)
      operation.add(int2)
      operation.add(int3)
      expect(operation.calc()).equals(-40)
    });

    it('MathOperation calc [*] operation', function() {
      const int1 = new MathInteger(10)
      const int2 = new MathInteger(20)
      const int3 = new MathInteger(30)
      const operation = new MathOperation(MathOperationTypes['*'])
      operation.add(int1)
      operation.add(int2)
      operation.add(int3)
      expect(operation.calc()).equals(6000)
    });

    it('MathOperation calc [/] operation', function() {
      const int1 = new MathInteger(6)
      const int2 = new MathInteger(3)
      const int3 = new MathInteger(2)
      const operation = new MathOperation(MathOperationTypes['/'])
      operation.add(int1)
      operation.add(int2)
      operation.add(int3)
      expect(operation.calc()).equals(1)
    });
  });

  describe('MathOperation having another MathOperation', function() {
    it('MathOperation calc should be correct for one MathInteger', function() {
      const int1 = new MathInteger(10)
      const operation1 = new MathOperation(MathOperationTypes['+'])
      const operation2 = new MathOperation(MathOperationTypes['+'])
      operation1.add(int1)
      operation2.add(operation1)
      expect(operation2.calc()).equals(10)
    });

    it('MathOperation calc should be correct for multiple MathInteger', function() {
      const int1 = new MathInteger(10)
      const int2 = new MathInteger(30)
      const operation1 = new MathOperation(MathOperationTypes['+'])
      const operation2 = new MathOperation(MathOperationTypes['+'])
      operation1.add(int1)
      operation1.add(int2)
      operation2.add(operation1)
      expect(operation2.calc()).equals(40)
    });

    it('MathOperation calc should be correct for multiple MathOperations', function() {
      const int1 = new MathInteger(10)
      const int2 = new MathInteger(30)
      const operation1 = new MathOperation(MathOperationTypes['+'])
      const operation2 = new MathOperation(MathOperationTypes['+'])
      const operation3 = new MathOperation(MathOperationTypes['+'])
      operation1.add(int1)
      operation1.add(int2)
      operation2.add(int1)
      operation2.add(int2)
      operation3.add(operation1)
      operation3.add(operation2)
      expect(operation3.calc()).equals(80)
    });
  });
});