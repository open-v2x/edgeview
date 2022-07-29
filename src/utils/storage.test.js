import { getToken, setToken } from './storage';

describe('test localStorage', () => {
  it('set token', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8';
    setToken(token);

    expect(getToken()).toBe(token);
    localStorage.clear();
  });
});
