import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Get('raw')
  async getAllRaw():Promise<Asistencia[]>{
    return await this.asistenciaService.findAllRaw();}

  @Get('orm')
  async getAllOrm():Promise<Asistencia[]>{
    return await this.asistenciaService.findAllOrm();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Asistencia>{ // ojo como puse en el service no lleva id pero dijimos que lo ibamos a resolver en clase el cómo sacarle este dato
    return await this.asistenciaService.findById(id);
  }

  @Post('crear')
  async crearAsistencia(@Body() createAsistenciaDto: CreateAsistenciaDto):Promise<boolean>{
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Put('actualizar/:id')
    async actualizarAsistenciaId(@Body() createAsistenciaDto: CreateAsistenciaDto, @Param('id') id: number): Promise<String> {
        return this.asistenciaService.update(createAsistenciaDto,id)
    } 

  @Delete('eliminar/:id')
  async eliminarAsistencia(@Param('id')id:number) : Promise<Asistencia>{
    return await this.asistenciaService.delete(id);
}
}
