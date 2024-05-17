import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class FocusmodeCreateDto {
  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsBoolean()
  @IsOptional()
  lowPowerModeFlag?: boolean

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

export class FocusmodeUpdateDto {
  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsBoolean()
  @IsOptional()
  lowPowerModeFlag?: boolean

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
