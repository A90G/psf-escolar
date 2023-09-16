import {  Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Get('raw')
  async getAllRaw():Promise<Clase[]>{
    return await this.claseService.findAllRaw(); // si abro parentesis y coloco relations:Estudiantes me va a traer todos los estudiantes por clase, es decir puedo establecer un criterio de búsqueda específico
  }

  @Get('orm')
  async getAllOrm():Promise<Clase[]>{
    return await this.claseService.findAllOrm();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Clase>{
    return await this.claseService.findById(id);
  }

  @Post('crear')
  async crearClase(@Body() createClaseDto: CreateClaseDto):Promise<boolean>{
    return this.claseService.create(createClaseDto);
  }

  @Put('actualizar/:id')
    async actualizarClaseId(@Body() createClaseDto: CreateClaseDto, @Param('id') id: number): Promise<String> {
        return this.claseService.update(createClaseDto,id)
    } 

  @Delete('eliminar/:id')
  async eliminarClase(@Param('id')id:number) : Promise<Clase>{
    return await this.claseService.delete(id);
}
}
