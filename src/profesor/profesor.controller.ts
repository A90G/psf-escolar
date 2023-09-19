import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {

    constructor(private readonly profesorService: ProfesorService){}

    @Get('raw')
    async getAllRaw():Promise<Profesor[]>{
        return await this.profesorService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm():Promise<Profesor[]>{
        return await this.profesorService.findAllOrm();
    }

    @Get(':id')
    async getId(@Param('id')id:number) : Promise<Profesor>{
        return await this.profesorService.findById(id);
    }

    @Post('crear')
    async crearProfesor(@Body() createProfesorDto:CreateProfesorDto):Promise<boolean>{
        return this.profesorService.create(createProfesorDto);
    }

    @Put('actualizar/:id')
    async actualizarProfesorId(@Body() createProfesorDto:CreateProfesorDto, @Param('id') id: number): Promise<String> {
        return this.profesorService.update(createProfesorDto,id)
    }

    @Delete('eliminar/:id')
    async eliminarProfesor(@Param('id')id:number) : Promise<Profesor>{
        return await this.profesorService.delete(id);
    }
}
