import { Usuario } from './../shared/entity/usuario.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { Rol } from 'src/shared/entity/rol.entity';
import { LoginDto } from 'src/shared/dto/login.dto';
import { LoginResponse } from 'src/shared/interface/login_response';
import { JwtPayload } from 'src/shared/interface/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name)
    private UsuarioModel: Model<Usuario>,
    @InjectModel(Rol.name)
    private RolModel: Model<Rol>,

    private jwtService: JwtService
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      const { password, roles, ...userData } = createUserDto;

      const roleExists = await this.RolModel.findById(roles);
      if (!roleExists) {
        throw new BadRequestException(
          `El rol ${roles} no existe en la base de datos`,
        );
      }

      const newUser = new this.UsuarioModel({
        password: bcryptjs.hashSync(password, 10),
        roles,
        ...userData,
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} ya existe!`);
      }

      throw new InternalServerErrorException(
        'Algo valio sal al crear el usuario',
      );
    }
  }

  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.UsuarioModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('El usuario no existe o el Correo es incorrecto');
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    const { password: _, ...userData } = user.toJSON();

    return {
      user: userData,
      token: this.generateJWT({
        id: userData._id
      })
    };
  }
  public async findUserById(userId: string): Promise<Usuario>{
    const user = await this.UsuarioModel.findById(userId);
    const { password, ...dataUser} = user.toJSON(); 

    return dataUser;
  }

  public generateJWT(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);

    return token;
  }
}
