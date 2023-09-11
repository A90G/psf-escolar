import { PartialType } from '@nestjs/mapped-types';
import { CreateDomicilioEstudianteDto } from './create-domicilio-estudiante.dto';

export class UpdateDomicilioEstudianteDto extends PartialType(CreateDomicilioEstudianteDto) {}
