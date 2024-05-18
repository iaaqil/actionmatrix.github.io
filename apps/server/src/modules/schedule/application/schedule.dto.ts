import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ScheduleCreateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  time?: string

  @IsString()
  @IsOptional()
  activity?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  userId?: string
}

export class ScheduleUpdateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  time?: string

  @IsString()
  @IsOptional()
  activity?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  userId?: string
}
