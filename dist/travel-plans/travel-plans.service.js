"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const travel_plan_entity_1 = require("../entities/travel-plan.entity");
const location_entity_1 = require("../entities/location.entity");
let TravelPlansService = class TravelPlansService {
    constructor(travelPlanRepository, locationRepository) {
        this.travelPlanRepository = travelPlanRepository;
        this.locationRepository = locationRepository;
    }
    async create(createTravelPlanDto) {
        const { locations, ...planData } = createTravelPlanDto;
        const startDate = new Date(planData.startDate);
        const endDate = new Date(planData.endDate);
        const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const travelPlan = this.travelPlanRepository.create({
            ...planData,
            duration,
            description: `${duration}일간의 여행 계획`,
        });
        const savedPlan = await this.travelPlanRepository.save(travelPlan);
        if (locations && locations.length > 0) {
            const locationEntities = locations.map(location => this.locationRepository.create({
                ...location,
                travelPlan: savedPlan,
            }));
            await this.locationRepository.save(locationEntities);
        }
        return this.findOne(savedPlan.id);
    }
    async findAll(sortBy) {
        const orderBy = sortBy === 'likes' ? { likes: 'DESC' } : { createdAt: 'DESC' };
        return this.travelPlanRepository.find({
            relations: ['locations'],
            order: orderBy,
        });
    }
    async findOne(id) {
        const travelPlan = await this.travelPlanRepository.findOne({
            where: { id },
            relations: ['locations'],
        });
        if (!travelPlan) {
            throw new common_1.NotFoundException('여행 계획을 찾을 수 없습니다.');
        }
        return travelPlan;
    }
};
exports.TravelPlansService = TravelPlansService;
exports.TravelPlansService = TravelPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(travel_plan_entity_1.TravelPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TravelPlansService);
//# sourceMappingURL=travel-plans.service.js.map