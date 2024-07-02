import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailAlreadyExists implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(
    email: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userAlreadyExists = await this.userService.findByEmail(email);
    return !userAlreadyExists;
  }
}

export const EmailUnique = (validationOptions: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAlreadyExists,
    });
  };
};
