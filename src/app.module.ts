import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuarioSchema } from './shared/entity/usuario.entity';
import { RolSchema } from './shared/entity/rol.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGODB_URI),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
