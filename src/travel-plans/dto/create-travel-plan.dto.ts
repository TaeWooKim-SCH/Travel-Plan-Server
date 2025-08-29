import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

class LocationDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsNumber()
  lat: number

  @IsNumber()
  lng: number

  @IsNumber()
  order: number

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  address?: string
}

export class CreateTravelPlanDto {
  @IsString()
  title: string

  @IsString()
  startDate: string

  @IsString()
  endDate: string

  @IsNumber()
  participants: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  locations: LocationDto[]
}