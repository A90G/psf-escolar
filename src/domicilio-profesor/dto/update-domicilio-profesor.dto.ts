import { PartialType } from '@nestjs/mapped-types';
import { CreateDomicilioProfesorDto } from './create-domicilio-profesor.dto';

export class UpdateDomicilioProfesorDto extends PartialType(CreateDomicilioProfesorDto) {}
