import { Injectable } from '@nestjs/common';
import { CreateDomicilioProfesorDto } from './dto/create-domicilio-profesor.dto';
import { UpdateDomicilioProfesorDto } from './dto/update-domicilio-profesor.dto';

@Injectable()
export class DomicilioProfesorService {
  create(createDomicilioProfesorDto: CreateDomicilioProfesorDto) {
    return 'This action adds a new domicilioProfesor';
  }

  findAll() {
    return `This action returns all domicilioProfesor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} domicilioProfesor`;
  }

  update(id: number, updateDomicilioProfesorDto: UpdateDomicilioProfesorDto) {
    return `This action updates a #${id} domicilioProfesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} domicilioProfesor`;
  }
}
