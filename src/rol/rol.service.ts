import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rol } from 'src/shared/entity/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectModel(Rol.name)
    private RolModel: Model<Rol>,
  ) {}

  public getAll(): Promise<Rol[]> {
    return this.RolModel.find();
  }
}
