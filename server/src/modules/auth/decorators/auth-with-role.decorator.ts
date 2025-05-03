import {applyDecorators, SetMetadata, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../guards/auth.guard";
import {EmployeeRole} from "../../../core/entities/employee";
import {RolesGuard} from "../guards/roles.guard";

export const AuthWithRole = (roles: EmployeeRole[]) => {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard), UseGuards(RolesGuard));
}
