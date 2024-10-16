import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto, LoginDto, RegisterDto } from '../shared/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from 'src/shared/entity/usuario.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../shared/interface/jwt-payload';
import { LoginResponse } from 'src/shared/interface/login_response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name)
    private userModel: Model<Usuario>,
    private jwtService: JwtService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      const { password, ...userData } = createUserDto;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });
      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('something terrible happen!!!');
    }
  }

  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email');
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password: _, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({
        id: user.id,
        roles: user.roles,
        name: user.name,
      }),
    };
  }

  public async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.create(registerDto);
    return {
      user: user,
      token: this.getJwtToken({
        id: user._id,
        roles: user.roles,
        name: user.name,
      }),
    };
  }

  public async findUserById(userId: string): Promise<Usuario> {
    const user = await this.userModel.findById(userId);
    const { password, ...dataUser } = user.toJSON();
    return dataUser;
  }

  public findAll(): Promise<Usuario[]> {
    return this.userModel.find();
  }

  // public findOne(id: number) {
  // return `This action returns a #${id} auth`;
  // }

  //update(id: number, updateUserDto: UpdateUserDto) {
  //return `This action updates a #${id} auth`;
  //}

  //remove(id: number) {
  // return `This action removes a #${id} auth`;
  //}

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
