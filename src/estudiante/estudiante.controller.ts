import {  Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {

  constructor(private readonly estudianteService: EstudianteService) {}

    @Get('raw')
    async getAllRaw():Promise<CreateEstudianteDto[]>{
        return await this.estudianteService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm():Promise<Estudiante[]>{
        return await this.estudianteService.findAllOrm();
    }

    @Get(':id')
    async getId(@Param('id')id:number) : Promise<CreateEstudianteDto>{
        return await this.estudianteService.findById(id);
    }

    @Post('crear')
    async crearEstudiante(@Body() createProfesorDto:CreateEstudianteDto):Promise<boolean>{
        return this.estudianteService.create(createProfesorDto);
    } 

    @Put('actualizar/:id')
    async actualizarEstudianteId(@Body() createEstudianteDto:CreateEstudianteDto, @Param('id') id: number): Promise<String> {
        return this.estudianteService.update(createEstudianteDto,id)
    } 

    @Delete('eliminar/:id')
    async eliminarEstudiante(@Param('id')id:number) : Promise<Estudiante>{
        return await this.estudianteService.delete(id);
    }
}
