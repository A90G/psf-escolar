import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomicilioProfesorService } from './domicilio-profesor.service';
import { CreateDomicilioProfesorDto } from './dto/create-domicilio-profesor.dto';
import { UpdateDomicilioProfesorDto } from './dto/update-domicilio-profesor.dto';

@Controller('domicilio-profesor')
export class DomicilioProfesorController {
  constructor(private readonly domicilioProfesorService: DomicilioProfesorService) {}

  @Post()
  create(@Body() createDomicilioProfesorDto: CreateDomicilioProfesorDto) {
    return this.domicilioProfesorService.create(createDomicilioProfesorDto);
  }

  @Get()
  findAll() {
    return this.domicilioProfesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domicilioProfesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomicilioProfesorDto: UpdateDomicilioProfesorDto) {
    return this.domicilioProfesorService.update(+id, updateDomicilioProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domicilioProfesorService.remove(+id);
  }
}
