import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ name: 'IsAdult', async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const valueTime = new Date(value).getTime();
    const currentTime = new Date().getTime();

    if (isNaN(valueTime)) {
      return false;
    }

    return (currentTime - valueTime) > (1000 * 60 * 60 * 24 * 365 * 18);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be at least 18 years old.`;
  }
}
