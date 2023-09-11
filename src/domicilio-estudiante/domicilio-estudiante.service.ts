import { Injectable } from '@nestjs/common';
import { CreateDomicilioEstudianteDto } from './dto/create-domicilio-estudiante.dto';
import { UpdateDomicilioEstudianteDto } from './dto/update-domicilio-estudiante.dto';

@Injectable()
export class DomicilioEstudianteService {
  create(createDomicilioEstudianteDto: CreateDomicilioEstudianteDto) {
    return 'This action adds a new domicilioEstudiante';
  }

  findAll() {
    return `This action returns all domicilioEstudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} domicilioEstudiante`;
  }

  update(id: number, updateDomicilioEstudianteDto: UpdateDomicilioEstudianteDto) {
    return `This action updates a #${id} domicilioEstudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} domicilioEstudiante`;
  }
}
