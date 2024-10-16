import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { LoginDto } from 'src/shared/dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Usuario } from 'src/shared/entity/usuario.entity';
import { RegisterDto } from 'src/shared/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this._authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this._authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this._authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    return this._authService.findAll();
  }

  //LoginResponse
  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request) {
    const user = req['user'] as Usuario;

    return {
      user,
      token: this._authService.getJwtToken({
        id: user._id,
        roles: user.roles,
        name: user.name,
      }),
    };
  }

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //return this.authService.findOne(+id);
  //}

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // return this.authService.update(+id, updateUserDto);
  //}

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //return this.authService.remove(+id);
  //}
}
