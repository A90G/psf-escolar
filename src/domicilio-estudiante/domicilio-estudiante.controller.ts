import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';
import { CreateDomicilioEstudianteDto } from './dto/create-domicilio-estudiante.dto';
import { DomicilioEstudiante } from './entities/domicilio-estudiante.entity';

@Controller('domicilio-estudiante')
export class DomicilioEstudianteController {
  constructor(private readonly domicilioEstudianteService: DomicilioEstudianteService) {}

  @Get()
  async getAllRaw():Promise<DomicilioEstudiante[]>{
    return await this.domicilioEstudianteService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm():Promise<DomicilioEstudiante[]>{
    return await this.domicilioEstudianteService.findAllOrm();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<DomicilioEstudiante>{
    return await this.domicilioEstudianteService.findById(id);
  }

  @Post('crear')
  async crearDomicilioEstudiante(@Body() createDomicilioEstudianteDto: CreateDomicilioEstudianteDto):Promise<boolean>{
    return this.domicilioEstudianteService.create(createDomicilioEstudianteDto);
  }

  @Put('actualizar/:id')
    async actualizarDomicilioEstudiantePorId(@Body() createDomicilioEstudianteDto: CreateDomicilioEstudianteDto, @Param('id') id: number): Promise<String> {
        return this.domicilioEstudianteService.update(createDomicilioEstudianteDto,id)
    } 


  @Delete('eliminar/:id')
  async eliminarDomicilioProfesor(@Param('id') id:number): Promise<DomicilioEstudiante>{
    return await this.domicilioEstudianteService.delete(+id);
}
}
