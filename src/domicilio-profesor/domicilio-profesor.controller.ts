import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { DomicilioProfesorService } from './domicilio-profesor.service';
import { CreateDomicilioProfesorDto } from './dto/create-domicilio-profesor.dto';
import { DomicilioProfesor } from './entities/domicilio-profesor.entity';

@Controller('domicilio-profesor')
export class DomicilioProfesorController {
  constructor(private readonly domicilioProfesorService: DomicilioProfesorService) {}

  @Get()
  async getAllRaw():Promise<CreateDomicilioProfesorDto[]>{
    return await this.domicilioProfesorService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm():Promise<DomicilioProfesor[]>{
    return await this.domicilioProfesorService.findAllOrm();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<CreateDomicilioProfesorDto>{
    return await this.domicilioProfesorService.findById(id);
  }

  @Post('crear')
  async crearDomicilioProfesor(@Body() createDomicilioProfesorDto : CreateDomicilioProfesorDto):Promise<boolean>{
    return this.domicilioProfesorService.create(createDomicilioProfesorDto);
  }

  @Put('actualizar/:id')
    async actualizarDomicilioProfesorPorId(@Body() createDomicilioProfesorDto : CreateDomicilioProfesorDto, @Param('id') id: number): Promise<String> {
        return this.domicilioProfesorService.update(createDomicilioProfesorDto,id)
    } 


  @Delete('eliminar/:id')
  async eliminarDomicilioProfesor(@Param('id') id:number): Promise<DomicilioProfesor>{
    return await this.domicilioProfesorService.delete(+id);
  }
}
