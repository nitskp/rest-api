import { IsEmail } from "class-validator";

export interface Field {
  age?: number;
  firstName?: string;
  lastName?: string;
}

export class UpdateUserDto {
  @IsEmail()
  email: string;
  updateField: Field;
}
