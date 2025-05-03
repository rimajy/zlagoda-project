import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from "class-validator";
import {Type} from "class-transformer";

export class CreateReceiptDto {
  @IsString()
  @IsOptional()
  @MinLength(13)
  @MaxLength(13)
  card_number?: string

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProductDto)
  products: ProductDto[]
}

class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(12)
  upc: string

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  products_number: number
}

