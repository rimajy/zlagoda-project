import {IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength} from "class-validator";

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  category_number: number

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  product_name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  characteristics: string
}
