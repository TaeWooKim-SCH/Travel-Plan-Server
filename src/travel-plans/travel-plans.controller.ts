import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { TravelPlansService } from './travel-plans.service'
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto'

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  @Post()
  create(@Body() createTravelPlanDto: CreateTravelPlanDto) {
    return this.travelPlansService.create(createTravelPlanDto)
  }

  @Get()
  findAll(@Query('sortBy') sortBy: 'popular' | 'likes' = 'popular') {
    return this.travelPlansService.findAll(sortBy)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelPlansService.findOne(id)
  }
}