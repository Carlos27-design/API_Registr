import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from 'src/shared/entity/rol.entity';

@Module({
  providers: [RolService],
  controllers: [RolController],
  imports: [MongooseModule.forFeature([{ name: 'Rol', schema: RolSchema }])],
})
export class RolModule {}
