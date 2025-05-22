import { PlayerStatistics } from "./playerStatistics";

export interface Game {
    id: string;
    description?: string;
    date: Date;
    players?: PlayerStatistics[];
    createdAt: Date;
    updatedAt: Date;
}

export interface  GameWithPlayer   {
    id: string,
    date: Date,
    players: PlayerStatistics[],
    playerCount: number
  }