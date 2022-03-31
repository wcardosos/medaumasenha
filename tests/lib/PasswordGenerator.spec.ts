import { PasswordGenerator } from '../../src/lib/PasswordGenerator';

jest.mock('uuid', () => ({
  v4: () => '676885cc-54b0-45dd-bafd-a9518f9996fa',
}));

describe('Lib: password generator', () => {
  describe('generateAlphanumeric', () => {
    it('Should throw error when characters quantity less than 6', () => {
      expect(() => PasswordGenerator.generateAlphanumeric(5)).toThrow('Characters quantity invalid');
    });

    it('Should throw error when characters quantity more than 36', () => {
      expect(() => PasswordGenerator.generateAlphanumeric(37)).toThrow('Characters quantity invalid');
    });

    it('Should return the entire generated password when characters quantity is null', () => {
      const expectedResult = '676885cc-54b0-45dd-bafd-a9518f9996fa';

      const result = PasswordGenerator.generateAlphanumeric(null);

      expect(result).toBe(expectedResult);
    });

    it('Should return the entire generated password when characters quantity is null', () => {
      const expectedResult = '676885cc';

      const result = PasswordGenerator.generateAlphanumeric(8);

      expect(result).toBe(expectedResult);
    });
  });
});
