import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidNumber implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number') {
      return false;
    }

    const integerPart = Math.floor(value).toString();
    if (integerPart.length > 13) {
      return false;
    }

    const decimalPart = value.toString().split('.')[1];
    if (decimalPart && decimalPart.length > 4) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property + ' must be no more than 13 digits before the comma and no more than 4 digits after the comma';
  }
}
