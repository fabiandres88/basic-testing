// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn), // Bypass the throttling to allow testing the function directly
}));

describe('throttledGetDataFromApi', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockedAxios = axios as jest.Mocked<typeof axios> as any;

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });
  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';
    const responseData = { id: 1, title: 'Test Post' };

    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseData }),
    });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const responseData = { id: 1, title: 'Test Post' };

    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseData }),
    });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const responseData = { id: 1, title: 'Test Post' };

    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseData }),
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(responseData);
  });
});
