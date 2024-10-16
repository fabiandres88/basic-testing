// Uncomment the code below and write your tests
import { simpleCalculator } from './index'; //Action

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 10, b: 5, action: '+' };
    const result = simpleCalculator(input);

    expect(result).toEqual(15);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 5, action: '-' };
    const result = simpleCalculator(input);

    expect(result).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const input = { a: 10, b: 5, action: '*' };
    const result = simpleCalculator(input);

    expect(result).toEqual(50);
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 5, action: '/' };
    const result = simpleCalculator(input);

    expect(result).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 10, b: 5, action: '^' };
    const result = simpleCalculator(input);

    expect(result).toEqual(100000);
  });

  test('should return null for invalid action', () => {
    const input = { a: 10, b: 5, action: 'x' };
    const result = simpleCalculator(input);

    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'x', b: 'y', action: '+' };
    const result = simpleCalculator(input);

    expect(result).toEqual(null);
  });
});
