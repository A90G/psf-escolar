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

  @Get(':claseId/:estudianteId')
  async findOne(@Param('claseId') claseId: number, @Param('estudianteId') estudianteId: number): Promise<Asistencia> {
    return await this.asistenciaService.findById(claseId, estudianteId);
  }

  @Post('crear')
  async crearAsistencia(@Body() createAsistenciaDto: CreateAsistenciaDto):Promise<boolean>{
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Put(':claseId/:estudianteId')
  async update(
    @Param('claseId') claseId: number,
    @Param('estudianteId') estudianteId: number,
    @Body() createAsistenciaDto: CreateAsistenciaDto
  ): Promise<string> {
    return await this.asistenciaService.update(createAsistenciaDto, claseId, estudianteId);
  }

@Delete(':claseId/:estudianteId')
async delete(
  @Param('claseId') claseId: number,
  @Param('estudianteId') estudianteId: number
): Promise<Asistencia> {
  return await this.asistenciaService.delete(claseId, estudianteId);
}
}
