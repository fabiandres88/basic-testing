// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const account = getBankAccount(15000);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(15000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(16000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const destinationAccount = getBankAccount(2800);
    expect(() => account.transfer(16000, destinationAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(16000, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.deposit(800)).toEqual({ _balance: 15800 });
  });

  test('should withdraw money', () => {
    expect(account.withdraw(600)).toEqual({ _balance: 15200 });
  });

  test('should transfer money', () => {
    const destinationAccount = getBankAccount(2800);

    expect(account.transfer(500, destinationAccount)).toEqual({
      _balance: 14700,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 1);

    await expect(account.fetchBalance()).resolves.toEqual(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(100);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 0);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
