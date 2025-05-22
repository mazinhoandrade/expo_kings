import { PlayerStatistics } from "./playerStatistics";

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    admin: boolean;
    birthday: Date;
    monthlypayment: boolean;
    statistics: PlayerStatistics[];
    createdAt?: Date;
    updatedAt?: Date;
}