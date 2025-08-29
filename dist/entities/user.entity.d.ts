import { TravelPlan } from './travel-plan.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    travelPlans: TravelPlan[];
    createdAt: Date;
    updatedAt: Date;
}
