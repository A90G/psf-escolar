import {  Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Get()
  async getAllRaw():Promise<Escuela[]>{
    return await this.escuelaService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm():Promise<Escuela[]>{
    return await this.escuelaService.findAllOrm();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Escuela>{
    return await this.escuelaService.findById(id);
  }

  @Post('crear')
  async crearEscuela(@Body() createEscuelaDto : CreateEscuelaDto):Promise<boolean>{
    return this.escuelaService.create(createEscuelaDto);
  }

  @Put('actualizar/:id')
    async actualizarEscuelaId(@Body() createEscuelaDto : CreateEscuelaDto, @Param('id') id: number): Promise<String> {
        return this.escuelaService.update(createEscuelaDto,id)
    } 


  @Delete('eliminar/:id')
  async eliminarEscuela(@Param('id') id:number): Promise<Escuela>{
    return await this.escuelaService.delete(+id);
  }
}
