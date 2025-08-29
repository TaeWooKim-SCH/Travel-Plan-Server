import { TravelPlan } from './travel-plan.entity';
export declare class Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    order: number;
    description: string;
    address: string;
    travelPlan: TravelPlan;
}
