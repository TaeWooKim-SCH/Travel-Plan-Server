import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TravelPlan } from '../entities/travel-plan.entity'
import { Location } from '../entities/location.entity'
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto'

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private travelPlanRepository: Repository<TravelPlan>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createTravelPlanDto: CreateTravelPlanDto): Promise<TravelPlan> {
    const { locations, ...planData } = createTravelPlanDto
    
    const startDate = new Date(planData.startDate)
    const endDate = new Date(planData.endDate)
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const travelPlan = this.travelPlanRepository.create({
      ...planData,
      duration,
      description: `${duration}일간의 여행 계획`,
    })

    const savedPlan = await this.travelPlanRepository.save(travelPlan)

    if (locations && locations.length > 0) {
      const locationEntities = locations.map(location =>
        this.locationRepository.create({
          ...location,
          travelPlan: savedPlan,
        })
      )
      await this.locationRepository.save(locationEntities)
    }

    return this.findOne(savedPlan.id)
  }

  async findAll(sortBy: 'popular' | 'likes'): Promise<TravelPlan[]> {
    const orderBy = sortBy === 'likes' ? { likes: 'DESC' } : { createdAt: 'DESC' }
    
    return this.travelPlanRepository.find({
      relations: ['locations'],
      order: orderBy as any,
    })
  }

  async findOne(id: string): Promise<TravelPlan> {
    const travelPlan = await this.travelPlanRepository.findOne({
      where: { id },
      relations: ['locations'],
    })

    if (!travelPlan) {
      throw new NotFoundException('여행 계획을 찾을 수 없습니다.')
    }

    return travelPlan
  }
}