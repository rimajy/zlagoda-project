import {IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class CreateCustomerCardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  cust_surname: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  cust_name: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  cust_patronymic?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(13)
  phone_number: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  city?: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  street?: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  zip_code?: string

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  percent: number
}
