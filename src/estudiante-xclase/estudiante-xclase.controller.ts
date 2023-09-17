import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EstudianteXclaseService } from './estudiante-xclase.service';
import { CreateEstudianteXclaseDto } from './dto/create-estudiante-xclase.dto';
import { EstudianteXclase } from './entities/estudiante-xclase.entity';

@Controller('estudiante-xclase')
export class EstudianteXclaseController {
  constructor(private readonly estudianteXclaseService: EstudianteXclaseService) {}

 
  @Get('raw')
  async getAllRaw():Promise<EstudianteXclase[]>{
    return await this.estudianteXclaseService.findAllRaw();}

  @Get('orm')
  async getAllOrm():Promise<EstudianteXclase[]>{
    return await this.estudianteXclaseService.findAllOrm();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<EstudianteXclase>{ // ojo como puse en el service no lleva id pero dijimos que lo ibamos a resolver en clase el cómo sacarle este dato
    return await this.estudianteXclaseService.findById(id);
  }

  @Post('crear')
  async crearEstudianteXclase(@Body() createEstudianteXclaseDto: CreateEstudianteXclaseDto):Promise<boolean>{
    return this.estudianteXclaseService.create(createEstudianteXclaseDto);
  }

  @Put('actualizar/:id')

    async actualizarEstudianteXclaseId(@Body() createEstudianteXclaseDto: CreateEstudianteXclaseDto, @Param('id') id: number): Promise<String> {
        return this.estudianteXclaseService.update(createEstudianteXclaseDto,id)
    } 

  @Delete('eliminar/:id')
  async eliminarEstudianteXclase(@Param('id')id:number) : Promise<EstudianteXclase>{
    return await this.estudianteXclaseService.delete(id);
}
}