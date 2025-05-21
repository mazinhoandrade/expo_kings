"use client"

import { Play } from 'lucide-react';
import React, { useEffect, useReducer } from 'react'

import { GameReducer } from '@/reducers/startGame';

import { Button } from '../ui/button';
const STORAGE_KEY = "gameadd";
const NewGame = () => {
    const [state, dispatch] = useReducer(
        GameReducer, 
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });
    
    const handleSelecionar = (name: string) => {
        const Exercise: Exercise = {
          id: crypto.randomUUID(),
          name,
          series: [
            {
              id: crypto.randomUUID(),
              series: 1,
              checked: false,
              repetitions: 0,
              load: 0,
            },
          ],
        };
    
        dispatch({ type: "ADD_EXERCISE", payload: Exercise });
      };
    
      const handleUpdateInterval = (id: string, interval: number) => {
        dispatch({ type: "UPDATE_EXERCISE", payload: { id, interval } });
      };
    
      const handleRemoverExercise = (id: string) => {
        dispatch({ type: "REMOVE_EXERCISE", payload: { id } });
      };
    
      const handleRemoverSerie = (exerciseId: string, serieId: string) => {
        dispatch({ type: "REMOVE_SERIE", payload: { exerciseId, serieId } });
      };
    
      const handleAddSerie = (id: string) => {
        dispatch({ type: "ADD_SERIE", payload: { id } });
      };
    
      const toggleSerieCheck = (exerciseId: string, serieId: string , checked: boolean) => {
        const interval = state.find(ex => ex.id === exerciseId)?.interval || 0;
    
        dispatch({
          type: "TOGGLE_SERIE_CHECK",
          payload: { exerciseId, serieId, checked },
        });
    
        if (checked && interval > 0) {
            setRestTime(interval);
            setPlayInterval(!playInterval);
          }
      };
    
      const handleUpdateSerie = (
        exerciseId: string,
        serieId: string,
        repetitions: number,
        load: number,
      ) => {
        dispatch({
          type: "UPDATE_SERIE",
          payload: {
            exerciseId,
            serieId,
            repetitions,
            load,
          },
        });
      };

  return (
    <div className="w-full p-2 pb-10 overflow-x-hidden">
      {/* Lista dos exercícios selecionados */}
      
          <ul className="mb-3 mt-2 space-y-3">
            {state.length > 0 &&
              state.map((ex) => (
                <p key={ex.id}></p>
                // <ListExerciseTraning
                //   key={ex.id}
                //   ex={ex}
                //   handleUpdateSerie={handleUpdateSerie}
                //   handleRemoverSerie={handleRemoverSerie}
                //   handleUpdateInterval={handleUpdateInterval}
                //   handleRemoverExercise={handleRemoverExercise}
                //   handleAddSerie={handleAddSerie}
                //   toggleSerieCheck={toggleSerieCheck}
                // />
              ))}
            {state.length === 0 && (
              <div className="text-md flex flex-col items-center gap-2 text-center text-zinc-600">
                <Play size={50} /> 
                Nenhum Jogador Adicionado
              </div>
            )}
          </ul>

      {/* Botão que abre o Sheet */}
      {/* <AddExercises handleSelecionar={handleSelecionar} /> */}

      <div className="flex flex-col gap-3">      
        <Button
        variant={"destructive"}
        disabled={state.length === 0}
        className="text-sm hover:bg-zinc-750 mt-2 w-full py-5 text-white focus:outline-none"
      >
        Cancelar Jogo
      </Button>
      <Button
        disabled={state.length === 0}
        className="text-sm hover:bg-zinc-750 mt-2 w-full bg-zinc-800 py-5 text-white focus:outline-none"
      >
        Salvar Jogo
      </Button>
      </div>     

    </div>
  )
}

export default NewGame;