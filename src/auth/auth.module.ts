import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from 'src/shared/entity/usuario.entity';
import { RolSchema } from 'src/shared/entity/rol.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Usuario', schema: UsuarioSchema },
      { name: 'Rol', schema: RolSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SEED,
      global: true,
      signOptions: { expiresIn:'6h'},
    })
  ],
})
export class AuthModule {}
