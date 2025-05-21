import { Exercise } from "@/types/exercise";
import { Serie } from "@/types/serie";

type Action =
  | {
      type: "ADD_EXERCISE";
      payload: {
        name: string;
        series: Serie[];
        //obs: string
      };
    }
  | {
      type: "UPDATE_EXERCISE";
      payload: { id: string; interval?: number };
    }
  | {
      type: "REORDER_EXERCICIOS";
      payload: Exercise[];
    }
  | {
      type: "REMOVE_EXERCISE";
      payload: { id: string };
    }
  | {
      type: "ADD_SERIE";
      payload: { id: string };
    }
  | {
      type: "REMOVE_SERIE";
      payload: {
        exerciseId: string;
        serieId: string;
      };
    }
  | {
      type: "UPDATE_SERIE";
      payload: {
        exerciseId: string;
        serieId: string;
        repetitions: number;
        load: number;
      };
    }
  | {
      type: "TOGGLE_SERIE_CHECK";
      payload: {
        exerciseId: string;
        serieId: string;
        checked: boolean;
      };
    };

export const GameReducer = (state: Exercise[], action: Action): Exercise[] => {
  switch (action.type) {
    case "ADD_EXERCISE":
      if (state.find((ex) => ex.name === action.payload.name)) {
        alert("Exercicio ja Adicionado");
        return state;
      }
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          name: action.payload.name,
          series: action.payload.series,
        },
      ];
    case "UPDATE_EXERCISE":
      return state.map((ex) => {
        if (ex.id === action.payload.id) {
          return {
            ...ex,
            interval: action.payload.interval,
          };
        }
        return ex;
      });
    case "REORDER_EXERCICIOS":
      return action.payload;
    case "ADD_SERIE":
      return state.map((ex) => {
        if (ex.id === action.payload.id) {
          const newSeries = {
            id: crypto.randomUUID(),
            series: ex.series.length + 1,
            repetitions: ex.series[0] ? ex.series[0].repetitions : 0,
            load: ex.series[0] ? ex.series[0].load : 0,
          };
          return {
            ...ex,
            series: [...ex.series, newSeries],
          };
        }
        return ex;
      });
    case "REMOVE_SERIE":
      return state.map((ex) => {
        if (ex.id === action.payload.exerciseId) {
          return {
            ...ex,
            series: ex.series.filter(
              (serie) => serie.id !== action.payload.serieId,
            ),
          };
        }
        return ex;
      });
    case "UPDATE_SERIE":
      return state.map((ex) => {
        if (ex.id === action.payload.exerciseId) {
          return {
            ...ex,
            interval: ex.interval,
            series: ex.series.map((serie) =>
              serie.id === action.payload.serieId
                ? {
                    ...serie,
                    repetitions: action.payload.repetitions,
                    load: action.payload.load,
                  }
                : serie,
            ),
          };
        }
        return ex;
      });
    case "TOGGLE_SERIE_CHECK":
      return state.map((ex) => {
        if (ex.id === action.payload.exerciseId) {
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
    case "REMOVE_EXERCISE":
      return state.filter((ex) => ex.id !== action.payload.id);
    default:
      return state;
  }
};