import {IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min, MinLength, Validate} from "class-validator";
import {IsValidNumber} from "../../../core/constraints/is-valid-number";

export class UpdateStoreProductDto {
  @IsString()
  @IsOptional()
  @MinLength(12)
  @MaxLength(12)
  upc: string

  @IsOptional()
  @Min(0)
  @Validate(IsValidNumber)
  selling_price: number

  @IsInt()
  @IsOptional()
  @Min(0)
  products_number: number

  @IsBoolean()
  @IsOptional()
  promotional_product: boolean
}
