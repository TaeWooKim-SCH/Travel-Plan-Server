import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelPlansController } from './travel-plans.controller'
import { TravelPlansService } from './travel-plans.service'
import { TravelPlan } from '../entities/travel-plan.entity'
import { Location } from '../entities/location.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TravelPlan, Location])],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
})
export class TravelPlansModule {}