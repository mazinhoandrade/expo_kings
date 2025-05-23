  import React from 'react'

import {
  AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Button } from './ui/button';

  interface Props {
    label: string;
    onClick: () => void
    disabled?: boolean
  }
  
  const DialogApp = ({label, onClick, disabled}: Props) => {
    


    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button  disabled={disabled} variant={"destructive"}>{label}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
            e removerá seus dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onClick}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default DialogApp;


