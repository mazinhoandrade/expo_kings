import { Game } from "@/app/types/game";
import { PlayerStatistics } from "@/app/types/playerStatistics";

type Action =
  | {
      type: "ADD_PLAYER";
      payload: {
        name: string;
        statistics: PlayerStatistics[];
        //obs: string
      };
    }
  | {
      type: "UPDATE_PLAYER";
      payload: { id: string; interval?: number };
    }
  | {
      type: "REMOVE_PLAYER";
      payload: { id: string };
    }
  | {
      type: "REMOVE_STATISTIC";
      payload: {
        PLAYERId: string;
        serieId: string;
      };
    }
  | {
      type: "UPDATE_STATISTIC";
      payload: {
        PLAYERId: string;
        serieId: string;
        repetitions: number;
        load: number;
      };
    }
  | {
      type: "TOGGLE_SERIE_CHECK";
      payload: {
        PLAYERId: string;
        serieId: string;
        checked: boolean;
      };
    };

export const GameReducer = (state: Game[], action: Action): Game[] => {
  switch (action.type) {
    case "ADD_PLAYER":
      if (state.find((ex) => ex.name === action.payload.name)) {
        alert("Exercicio ja Adicionado");
        return state;
      }
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          name: action.payload.name,
          statistics: action.payload.statistics,
        },
      ];
    case "UPDATE_PLAYER":
      return state.map((ex) => {
        if (ex.id === action.payload.id) {
          return {
            ...ex,
            interval: action.payload.interval,
          };
        }
        return ex;
      });
      case "REMOVE_PLAYER":
      return state.filter((ex) => ex.id !== action.payload.id);
    default:
      return state;
    // case "REMOVE_SERIE":
    //   return state.map((ex) => {
    //     if (ex.id === action.payload.PLAYERId) {
    //       return {
    //         ...ex,
    //         series: ex.series.filter(
    //           (serie) => serie.id !== action.payload.serieId,
    //         ),
    //       };
    //     }
    //     return ex;
    //   });
    // case "UPDATE_SERIE":
    //   return state.map((ex) => {
    //     if (ex.id === action.payload.PLAYERId) {
    //       return {
    //         ...ex,
    //         interval: ex.interval,
    //         series: ex.series.map((serie) =>
    //           serie.id === action.payload.serieId
    //             ? {
    //                 ...serie,
    //                 repetitions: action.payload.repetitions,
    //                 load: action.payload.load,
    //               }
    //             : serie,
    //         ),
    //       };
    //     }
    //     return ex;
    //   });
    case "TOGGLE_SERIE_CHECK":
      return state.map((ex) => {
        if (ex.id === action.payload.PLAYERId) {
          return {
            ...ex,
            series: ex.series.map((serie) =>
              serie.id === action.payload.serieId
                ? {
                    ...serie,
                    checked: action.payload.checked,
                  }
                : serie,
            ),
          };
        }
        return ex;
      });

  }
};