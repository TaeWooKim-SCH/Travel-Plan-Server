import { Location } from './location.entity';
import { User } from './user.entity';
export declare class TravelPlan {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: number;
    participants: number;
    likes: number;
    locations: Location[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
