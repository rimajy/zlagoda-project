import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {EmployeeService} from "../employee/employee.service";
import {JwtService} from "@nestjs/jwt";
import * as argon2 from 'argon2';
import {ConfigService} from "@nestjs/config";
import {Response} from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}


  async login(loginDto: LoginDto, res: Response) {
    const employee = await this.employeeService.getEmployeeByLogin(loginDto.login);
    if (!employee) {
      throw new NotFoundException("Employee Not Found");
    }

    try {
      const hashMatch = await argon2.verify(employee.password_hash, loginDto.password);
      if (!hashMatch) throw 'passwords do not match';
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Invalid Credentials");
    }

    const jwt = await this.jwtService.signAsync(
      {
        id_employee: employee.id_employee
      },
      {
        secret: this.configService.getOrThrow("JWT_SECRET"),
        expiresIn: "30d",
      }
    );

    res.cookie('access_token', jwt, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30
    });

    return {
      access_token: jwt
    }
  }

  async logout(res: Response) {
    res.cookie('access_token', '', {
      maxAge: 0
    });
  }
}
