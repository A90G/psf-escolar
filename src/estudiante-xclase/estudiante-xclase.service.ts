import { Injectable } from '@nestjs/common';
import { CreateEstudianteXclaseDto } from './dto/create-estudiante-xclase.dto';
import { UpdateEstudianteXclaseDto } from './dto/update-estudiante-xclase.dto';

@Injectable()
export class EstudianteXclaseService {
  create(createEstudianteXclaseDto: CreateEstudianteXclaseDto) {
    return 'This action adds a new estudianteXclase';
  }

  findAll() {
    return `This action returns all estudianteXclase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudianteXclase`;
  }

  update(id: number, updateEstudianteXclaseDto: UpdateEstudianteXclaseDto) {
    return `This action updates a #${id} estudianteXclase`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudianteXclase`;
  }
}
