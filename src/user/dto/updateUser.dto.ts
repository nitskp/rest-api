export interface Field {
  age?: number;
  firstName?: string;
  lastName?: string;
}

export class UpdateUserDto {
  email: string;
  updateField: Field;
}
