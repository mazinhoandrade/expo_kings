import { PlayerStatistics } from "./playerStatistics";

export interface Game {
    id: string;
    description?: string;
    date: Date;
    player: PlayerStatistics[];
    createdAt: Date;
    updatedAt: Date;
}