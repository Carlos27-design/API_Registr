import { Controller, Get } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private readonly _rolService: RolService) {}
  @Get()
  public getAll() {
    return this._rolService.getAll();
  }
}
