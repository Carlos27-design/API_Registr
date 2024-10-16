import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuarioSchema } from './shared/entity/usuario.entity';
import { RolSchema } from './shared/entity/rol.entity';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGODB_URI),

    AuthModule,

    RolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
