import { X } from "lucide-react";

import { PlayerInput } from "@/app/types/playerStatistics";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

interface PlayerItemProps {
  player: PlayerInput;
  handleChange: (userId: string, field: keyof PlayerInput, value: string|boolean) => void;
  removePlayer: (userId: string) => void;
}

export default function PlayerItem({
  player,
  handleChange,
  removePlayer,
}: PlayerItemProps) {
  return (
    <TableRow key={player.userId}>
      <TableCell>{player.name}</TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
          value={player.gols}
          onChange={(e) => handleChange(player.userId, "gols", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"          
          value={player.assistances}
          onChange={(e) => handleChange(player.userId, "assistances", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
          value={player.defenses}
          onChange={(e) => handleChange(player.userId, "defenses", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={player.topcover}
          onCheckedChange={(checked) =>
            handleChange(player.userId, "topcover", checked === true)
          }
        />
      </TableCell>
      <TableCell>
        <Button variant="destructive" onClick={() => removePlayer(player.userId)}>
          <X className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
