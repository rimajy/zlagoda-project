import {EmployeeRole} from "../../../core/entities/employee";
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from "class-validator";
import {IsValidNumber} from "../../../core/constraints/is-valid-number";

export class UpdateEmployeeDto {
  // @IsString()
  // @IsOptional()
  // @MinLength(3)
  // @MaxLength(100)
  // password?: string

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  empl_surname?: string

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  empl_name?: string

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  empl_patronymic?: string

  @IsOptional()
  @IsEnum(EmployeeRole)
  empl_role?: EmployeeRole

  @IsOptional()
  @Validate(IsValidNumber)
  salary?: number

  @IsOptional()
  @IsISO8601()
  date_of_birth?: string

  @IsOptional()
  @IsISO8601()
  date_of_start?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(13)
  phone_number?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  city?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  street?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(9)
  zip_code?: string
}
