import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';
import { CreateDomicilioEstudianteDto } from './dto/create-domicilio-estudiante.dto';
import { UpdateDomicilioEstudianteDto } from './dto/update-domicilio-estudiante.dto';

@Controller('domicilio-estudiante')
export class DomicilioEstudianteController {
  constructor(private readonly domicilioEstudianteService: DomicilioEstudianteService) {}

  @Post()
  create(@Body() createDomicilioEstudianteDto: CreateDomicilioEstudianteDto) {
    return this.domicilioEstudianteService.create(createDomicilioEstudianteDto);
  }

  @Get()
  findAll() {
    return this.domicilioEstudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domicilioEstudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomicilioEstudianteDto: UpdateDomicilioEstudianteDto) {
    return this.domicilioEstudianteService.update(+id, updateDomicilioEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domicilioEstudianteService.remove(+id);
  }
}
