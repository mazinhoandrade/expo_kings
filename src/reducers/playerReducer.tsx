
import { toast } from "sonner";

import { PlayerAction, PlayerInput } from "@/app/types/playerStatistics";

export const playerReducer = (state: PlayerInput[], action: PlayerAction): PlayerInput[] => {
  switch (action.type) {
    case "SET_ALL":
      return action.payload;
    case "ADD_PLAYER":
      if (state.find((ex) => ex.userId === action.payload.userId)) {
        toast.error("Jogador já cadastrado!");
        return state;
      }
      return [
        ...state,
        {
          userId: action.payload.userId,
          name: action.payload.name,
          gols: 0,
          assistances: 0,
          defenses: 0,
          topcover: false,
        },
      ];
    case "REMOVE_PLAYER":
      return state.filter(player => player.userId !== action.payload.userId);
    case "UPDATE_FIELD":
      return state.map(player =>
        player.userId === action.payload.userId
          ? {
              ...player,
              [action.payload.field]:
                action.payload.field === "topcover"
                  ? action.payload.value
                  : parseInt(action.payload.value as string),
            }
          : player
      );
    case "RESET":
      return [];
    default:
      return state;
  }
};
