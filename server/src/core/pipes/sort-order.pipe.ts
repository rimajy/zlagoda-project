import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {SortOrder, sortOrders} from "../types/sort-order";

@Injectable()
export class SortOrderPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const stringValue: string = value + '';

    if (!sortOrders.includes(stringValue as SortOrder)){
      throw new BadRequestException(`Validation failed: ${value} must be ASC or DESC`);
    }

    return stringValue;
  }
}
