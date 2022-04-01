import { v4 as uuidGenerator } from 'uuid';

interface ICharactersQuantityBoundaries {
  min: number
  max: number
}
export class PasswordGenerator {
  private static checkCharactersQuantity(
    charactersQuantity: number | null,
    { max, min }: ICharactersQuantityBoundaries,
  ): void {
    if (charactersQuantity && (charactersQuantity < min || charactersQuantity > max)) {
      throw Error('Characters quantity invalid');
    }
  }

  public static generateAlphanumeric(charactersQuantity: number | null): string {
    const DEFAULT_CHARACTERS_QUANTITY = 36;

    PasswordGenerator
      .checkCharactersQuantity(charactersQuantity, { max: DEFAULT_CHARACTERS_QUANTITY, min: 6 });

    const generatedPassword = uuidGenerator();

    return generatedPassword.slice(0, charactersQuantity || DEFAULT_CHARACTERS_QUANTITY);
  }

  public static generateNumeric(charactersQuantity: number | null): string {
    const DEFAULT_CHARACTERS_QUANTITY = 16;

    PasswordGenerator
      .checkCharactersQuantity(charactersQuantity, { max: DEFAULT_CHARACTERS_QUANTITY, min: 6 });

    const generatedPassword = Math.random().toString().replace('0.', '');

    return generatedPassword.slice(0, charactersQuantity || DEFAULT_CHARACTERS_QUANTITY);
  }
}
