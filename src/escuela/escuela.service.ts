import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {

  private escuelas:Escuela[] = [];

  constructor(
    @InjectRepository(Escuela)
    private readonly escuelasRepository:Repository<Escuela>
    ){}

    //'This action adds a new school';

    async create(createEscuelaDto : CreateEscuelaDto) : Promise<boolean>{
      try{
        const escuela = await this.escuelasRepository.save(new Escuela ( 
        createEscuelaDto.nombre, createEscuelaDto.domicilio, createEscuelaDto.ciudad, createEscuelaDto.clase));
        if (escuela) {
          return true;
        } else {
          throw new Error('No se pudo crear la nueva escuela');
        }
      }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en escuela create - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }

// return `This action returns all Schools`

    async findAllRaw():Promise<CreateEscuelaDto[]>{
      try {
        const datos = await this.escuelasRepository.query("select * from escuela");
        const  escuelas : CreateEscuelaDto[] = [];
      for (const element of datos) {
        const escuela: CreateEscuelaDto = {
          nombre: element.nombre, 
          domicilio: element.domicilio, 
          ciudad: element.ciudad, 
          clase: element.clase, 
        };
        escuelas.push(escuela);
      }
    
      return escuelas;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en findAllRaw - ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    }
  async findAllOrm():Promise<Escuela[]>{
    return await this.escuelasRepository.find();
}

//`This action returns a #${id} escuela`

async findById(id :number) : Promise<CreateEscuelaDto> {
  try{
    const criterio : FindOneOptions = { where: { id:id} };
    const escuela : Escuela  = await this.escuelasRepository.findOne( criterio );
    if (escuela) {
      const createEscuelaDto: CreateEscuelaDto = {
        nombre: escuela.getNombre(),
        domicilio: escuela.getDomicilio(),
        ciudad: escuela.getCiudad(),
        clase: escuela.getClase(),
      };
      return createEscuelaDto;
    } else {
      throw new Error('No se encuentra la escuela');
    }
  }  catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en escuela find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

// `This action updates a #${id} escuela`;

async update(createEscuelaDto : CreateEscuelaDto, id:number) : Promise<string>{
  try{
      const criterio : FindOneOptions = { where : {id:id} };
      let escuela : Escuela = await this.escuelasRepository.findOne(criterio);
      if(!escuela)
          throw new Error('no se pudo encontrar la escuela a modificar ');
          const antiguaEscuela = {
            nombre: escuela.getNombre(),
            domicilio: escuela.getDomicilio(),
            ciudad: escuela.getCiudad(),
            clase: escuela.getClase(),
          };
      
          if (createEscuelaDto.nombre !== null && createEscuelaDto.nombre !== undefined) {
            escuela.setNombre(createEscuelaDto.nombre);
          }       
          if (createEscuelaDto.domicilio !== null && createEscuelaDto.domicilio !== undefined) {
            escuela.setDomicilio(createEscuelaDto.domicilio);
          } 
          if (createEscuelaDto.ciudad !== null && createEscuelaDto.ciudad !== undefined) {
            escuela.setCiudad(createEscuelaDto.ciudad);
          } 
          if (createEscuelaDto.clase !== null && createEscuelaDto.clase !== undefined) {
            escuela.setClase(createEscuelaDto.clase);}

            escuela = await this.escuelasRepository.save(escuela);
          return `OK - ${antiguaEscuela.nombre} --> ${createEscuelaDto.nombre} (${createEscuelaDto.domicilio}),(${createEscuelaDto.ciudad}),(${createEscuelaDto.clase})`;
      }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en clase update - ' + error
      },HttpStatus.NOT_FOUND)
  }
}


// `This action removes a #${id} escuela`;
async delete(id:number): Promise<any>{
  try{
      const criterio : FindOneOptions = { where : {id:id} }
      let escuela : Escuela = await this.escuelasRepository.findOne(criterio);
      if(!escuela)
          throw new Error('no se pudo eliminar escuela ');
      else{
          await this.escuelasRepository.remove(escuela);
          return { id:id,
                  message:'se elimino exitosamente la escuela'
              }
          }
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en escuela delete - ' + error
      },HttpStatus.NOT_FOUND)
  }
  
}
}


