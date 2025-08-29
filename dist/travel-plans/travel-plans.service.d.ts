import { Repository } from 'typeorm';
import { TravelPlan } from '../entities/travel-plan.entity';
import { Location } from '../entities/location.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
export declare class TravelPlansService {
    private travelPlanRepository;
    private locationRepository;
    constructor(travelPlanRepository: Repository<TravelPlan>, locationRepository: Repository<Location>);
    create(createTravelPlanDto: CreateTravelPlanDto): Promise<TravelPlan>;
    findAll(sortBy: 'popular' | 'likes'): Promise<TravelPlan[]>;
    findOne(id: string): Promise<TravelPlan>;
}
