import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {EmployeeService} from "../../employee/employee.service";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.id_employee) throw new UnauthorizedException();

    const employee = await this.employeeService.getEmployeeById(request.id_employee);
    if (!employee) throw new UnauthorizedException();

    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles.includes(employee.empl_role)) throw new ForbiddenException();

    request.employee = employee;
    return true;
  }
}
