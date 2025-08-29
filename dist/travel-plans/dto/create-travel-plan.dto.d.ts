declare class LocationDto {
    name?: string;
    lat: number;
    lng: number;
    order: number;
    description?: string;
    address?: string;
}
export declare class CreateTravelPlanDto {
    title: string;
    startDate: string;
    endDate: string;
    participants: number;
    locations: LocationDto[];
}
export {};
