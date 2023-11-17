import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  testingPrivateRoute(
    @Req() request: Express.Request,

    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Private',
      headers,
    };
  }
}
