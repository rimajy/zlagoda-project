import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {AuthWithRole} from "../auth/decorators/auth-with-role.decorator";
import {EmployeeRole} from "../../core/entities/employee";
import {SortOrderPipe} from "../../core/pipes/sort-order.pipe";
import {SortOrder} from "../../core/types/sort-order";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER])
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(@Query('sort', new SortOrderPipe()) sort?: SortOrder) {
    if (sort) {
      return this.categoryService.getCategoriesCardSortedByName(sort);
    }
    return this.categoryService.getCategories();
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  update(@Param('id' , new ParseIntPipe()) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.remove(+id);
  }
}
