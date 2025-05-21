import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaCheck } from "react-icons/fa";
import { IoClose, IoCloseCircle, IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineDelete, MdOutlineTimer } from "react-icons/md";
import { SiGravatar } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { restIterval } from "@/data/restInterval";
import { Exercise } from "@/types/exercise";

type Props = {
  ex: Exercise;
  handleUpdateSerie: (
    exerciseId: string,
    serieId: string,
    repetitions: number,
    load: number,
  ) => void;
  handleRemoverSerie: (exerciseId: string, serieId: string) => void;
  handleUpdateInterval: (exerciseId: string, interval: number) => void;
  handleRemoverExercise: (exerciseId: string) => void;
  handleAddSerie: (exerciseId: string) => void;
  toggleSerieCheck: (
    exerciseId: string,
    serieId: string,
    checked: boolean,
  ) => void;
};

const ItemGame = ({
  ex,
  handleUpdateSerie,
  handleRemoverSerie,
  handleUpdateInterval,
  handleRemoverExercise,
  handleAddSerie,
  toggleSerieCheck,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ex.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-start justify-between rounded border p-3"
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <div
            {...listeners}
            className="flex w-full flex-row items-center gap-2"
          >
            <div className="flex w-1/6 flex-row items-center gap-2">
              <IoGitCompareOutline
                className="cursor-grab"
                title="Reordenar"
                size={30}
              />
              <SiGravatar className="rounded-full bg-primary p-2" size={40} />
            </div>
            <div className="w-5/6 text-sm">{ex.name}</div>
          </div>
          <div className="">
            <div className="flex flex-row items-center gap-3">
              <IoCloseCircle
                onClick={() => handleRemoverExercise(ex.id)}
                className="text-red-600"
                size={40}
              />
            </div>
          </div>
        </div>
        <div className="my-2 flex w-full flex-row items-center gap-1 text-sm">
          <MdOutlineTimer size={20} />
          <Select
            defaultValue={ex.interval?.toString()}
            onValueChange={(value) =>
              handleUpdateInterval(ex.id, Number(value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tempo de Descanso: DESATIVADO" />
            </SelectTrigger>
            <SelectContent>
              {restIterval.map((option) => (
                <SelectItem value={option.value.toString()} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Séries</TableHead>
              <TableHead className="w-[100px]">Anterior</TableHead>
              <TableHead>Kg</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead>
                <FaCheck />
              </TableHead>
              <TableHead>
                <MdOutlineDelete />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ex.series.map((serie) => (
              <TableRow
                key={serie.id}
                className={`${serie.checked ? "bg-green-900 text-white hover:bg-green-900" : ""}`}
              >
                <TableCell className="font-medium">{serie.series}</TableCell>
                <TableCell className="font-medium text-zinc-500">
                  {serie.load} x {serie.repetitions}
                </TableCell>
                <TableCell>
                  <Input
                    className="w-20 rounded border-none bg-transparent px-2 py-1"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    //value={serie.load}
                    placeholder={serie.load.toString()}
                    onChange={(e) =>
                      handleUpdateSerie(
                        ex.id,
                        serie.id,
                        serie.repetitions,
                        Number(e.target.value),
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="w-20 rounded border border-none bg-transparent px-2 py-1"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    //value={serie.repetitions}
                    placeholder={serie.repetitions.toString()}
                    onChange={(e) =>
                      handleUpdateSerie(
                        ex.id,
                        serie.id,
                        Number(e.target.value),
                        serie.load,
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    className="h-7 w-7"
                    checked={serie.checked}
                    onCheckedChange={() =>
                      toggleSerieCheck(ex.id, serie.id, !serie.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoverSerie(ex.id, serie.id)}
                  >
                    <IoClose />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={() => handleAddSerie(ex.id)}
          className="text-md hover:bg-zinc-750 mt-2 w-full bg-zinc-800 py-5 text-white focus:outline-none"
        >
          + Adicionar Série
        </Button>
      </div>
    </li>
  );
};

export default ListExerciseTraning;
