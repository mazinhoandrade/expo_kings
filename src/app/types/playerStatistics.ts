import { Game } from "./game";
import { User } from "./user";

export interface PlayerStatistics {
    id: string;
    userId: string;
    gameId: string;
    user: User;
    game: Game;
    topcover: number;
    gols: number;
    assistances: number;
    defenses: number;
    createdAt: Date;
    updatedAt: Date;
}