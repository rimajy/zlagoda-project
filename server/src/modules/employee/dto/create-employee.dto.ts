import {EmployeeRole} from "../../../core/entities/employee";
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength, Min,
  MinLength,
  Validate
} from "class-validator";
import {IsValidNumber} from "../../../core/constraints/is-valid-number";
import {IsAdultConstraint} from "../../../core/constraints/is-adult.constraint";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  login: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  empl_surname: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  empl_name: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  empl_patronymic?: string

  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  empl_role: EmployeeRole

  @IsNotEmpty()
  @Min(0)
  @Validate(IsValidNumber)
  salary: number

  @IsNotEmpty()
  @IsISO8601()
  @Validate(IsAdultConstraint)
  date_of_birth: string

  @IsNotEmpty()
  @IsISO8601()
  date_of_start: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(13)
  phone_number: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  city: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  street: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(9)
  zip_code: string
}
