import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EstudianteXclaseService } from './estudiante-xclase.service';
import { CreateEstudianteXclaseDto } from './dto/create-estudiante-xclase.dto';
import { EstudianteXclase } from './entities/estudiante-xclase.entity';

@Controller('estudiante-xclase')
export class EstudianteXclaseController {
  constructor(private readonly estudianteXclaseService: EstudianteXclaseService) {}

 
  @Get('raw')
  async getAllRaw():Promise<CreateEstudianteXclaseDto[]>{
    return await this.estudianteXclaseService.findAllRaw();}

  @Get('orm')
  async getAllOrm():Promise<EstudianteXclase[]>{
    return await this.estudianteXclaseService.findAllOrm();
  }

  @Get(':claseId/:estudianteId')
  async findOne(@Param('claseId') claseId: number, @Param('estudianteId') estudianteId: number): Promise<CreateEstudianteXclaseDto> {
    return await this.estudianteXclaseService.findById(claseId, estudianteId);
  }

  @Post('crear')
  async crearEstudianteXclase(@Body() createEstudianteXclaseDto: CreateEstudianteXclaseDto):Promise<boolean>{
    return this.estudianteXclaseService.create(createEstudianteXclaseDto);
  }

  @Put(':claseId/:estudianteId')
  async update(
    @Param('claseId') claseId: number,
    @Param('estudianteId') estudianteId: number,
    @Body() createEstudianteXclaseDto: CreateEstudianteXclaseDto
  ): Promise<string> {
    return await this.estudianteXclaseService.update(createEstudianteXclaseDto, claseId, estudianteId);
  }

@Delete(':claseId/:estudianteId')
async delete(
  @Param('claseId') claseId: number,
  @Param('estudianteId') estudianteId: number
): Promise<EstudianteXclase> {
  return await this.estudianteXclaseService.delete(claseId, estudianteId);
}
}