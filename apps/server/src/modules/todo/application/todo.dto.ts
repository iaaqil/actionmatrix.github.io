import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TodoCreateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  status?: string

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
  journalId?: string
}

export class TodoUpdateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  status?: string

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
  journalId?: string
}
