"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  value?: Date;
  onChange: (value: Date | undefined) => void;
};

export function SelectDate({ value, onChange }: Props) {
  //const [date, setDate] = React.useState<Date>( value );
  const handleDateChange = (date: Date | undefined) => {
    onChange?.(date); // Notifica o componente pai
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP", { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateChange}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            fromDate={new Date()}
            locale={ptBR}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
