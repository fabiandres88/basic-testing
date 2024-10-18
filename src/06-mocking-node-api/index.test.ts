// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spySetTimeOut = jest.spyOn(global, 'setTimeout');

    const mockCallback = jest.fn();
    const timeoutValue = 3000;

    doStuffByTimeout(mockCallback, timeoutValue);

    expect(spySetTimeOut).toHaveBeenCalledWith(mockCallback, timeoutValue);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const timeoutValue = 2000;

    doStuffByTimeout(mockCallback, timeoutValue);

    jest.advanceTimersByTime(timeoutValue);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval');

    const mockCallback = jest.fn();
    const intervalValue = 3000;

    doStuffByInterval(mockCallback, intervalValue);

    expect(spySetInterval).toHaveBeenCalledWith(mockCallback, intervalValue);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const intervalValue = 1000;

    doStuffByInterval(mockCallback, intervalValue);

    jest.advanceTimersByTime(3000);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const fullPath = '/mocked/full/path/test.txt';

    (join as jest.Mock).mockReturnValue(fullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';

    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fileContentBuffer = Buffer.from('File content');
    const fullPath = '/mocked/full/path/test.txt';

    (join as jest.Mock).mockReturnValue(fullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContentBuffer);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe('File content');
  });
});
