import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteXclaseService } from './estudiante-xclase.service';
import { CreateEstudianteXclaseDto } from './dto/create-estudiante-xclase.dto';
import { UpdateEstudianteXclaseDto } from './dto/update-estudiante-xclase.dto';

@Controller('estudiante-xclase')
export class EstudianteXclaseController {
  constructor(private readonly estudianteXclaseService: EstudianteXclaseService) {}

  @Post()
  create(@Body() createEstudianteXclaseDto: CreateEstudianteXclaseDto) {
    return this.estudianteXclaseService.create(createEstudianteXclaseDto);
  }

  @Get()
  findAll() {
    return this.estudianteXclaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteXclaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteXclaseDto: UpdateEstudianteXclaseDto) {
    return this.estudianteXclaseService.update(+id, updateEstudianteXclaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteXclaseService.remove(+id);
  }
}
