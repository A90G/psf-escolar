import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteXclaseDto } from './create-estudiante-xclase.dto';

export class UpdateEstudianteXclaseDto extends PartialType(CreateEstudianteXclaseDto) {}
