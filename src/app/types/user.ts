import { PlayerStatistics } from "./playerStatistics";

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    admin: boolean;
    birthday: Date;
    monthlypayment: boolean;
    position: string;
    statistics: PlayerStatistics[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PlayerStats {
  id: string;
  name: string;
  image: string;
  birthday: Date;
  monthlypayment: boolean;
  position: string;
  totalGols: number;
  totalAssistances: number;
  totalTopcover: number;
  totalDefenses: number;
  gamesPlayed: number;
}

export interface UserBrithdayMonth {
  id: string;
  name: string;
  image: string;
  monthlypayment: boolean;
  position: string;
  birthday: Date;
}
