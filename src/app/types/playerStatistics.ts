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


export interface PlayerInput {
  name: string;
  userId: string;
  gols: number;
  assistances: number;
  defenses: number;
  topcover: boolean;
}

export type PlayerAction =
  | { type: "SET_ALL"; payload: PlayerInput[] }
  | { type: "ADD_PLAYER"; payload: { userId: string; name: string } }
  | { type: "REMOVE_PLAYER"; payload: { userId: string } }
  | { type: "UPDATE_FIELD"; payload: { userId: string; field: keyof PlayerInput; value: string | boolean } }
  | { type: "RESET" };