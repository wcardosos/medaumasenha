import { v4 as uuidGenerator } from 'uuid';

export class PasswordGenerator {
  public static generateAlphanumeric(charactersQuantity: number | null): string {
    const DEFAULT_CHARACTERS_QUANTITY = 36;

    if (charactersQuantity !== null && (charactersQuantity < 6 || charactersQuantity > 36)) {
      throw Error('Characters quantity invalid');
    }

    const generatedPassword = uuidGenerator();

    return generatedPassword.slice(0, charactersQuantity || DEFAULT_CHARACTERS_QUANTITY);
  }

  public static generateNumeric(charactersQuantity: number | null): string {
    const DEFAULT_CHARACTERS_QUANTITY = 16;

    if (charactersQuantity !== null && (charactersQuantity < 6 || charactersQuantity > 16)) {
      throw Error('Characters quantity invalid');
    }

    const generatedPassword = Math.random().toString().replace('0.', '');

    return generatedPassword.slice(0, charactersQuantity || DEFAULT_CHARACTERS_QUANTITY);
  }
}
