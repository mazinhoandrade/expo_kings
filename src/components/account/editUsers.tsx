"use client";
import * as React from "react";
import { toast } from "sonner";

import { getListUsers } from "@/app/_data/get-users-player";
import { User } from "@/app/types/user";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DialogApp from "../dialogApp";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useMemo, useState } from "react";

type CheckboxItem = {
  id: string;
  checked: boolean;
};

type DataExpire = {
  id: string;
  dataexist: Date;
};

const EditUsers = () => {
  const [users, setUsers] = useState<Omit<User, "statistics">[]>([]);
  const [allusers, setAllUsers] = useState<Omit<User, "statistics">[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const [checkbox, setCheckbox] = React.useState<CheckboxItem[]>([]);
  const [dataexist, setDataExist] = React.useState<DataExpire[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckbox((prevCheckbox) => {
      const exists = prevCheckbox.some((item) => item.id === id);

      if (exists) {
        return prevCheckbox.map((item) =>
          item.id === id ? { ...item, checked } : item,
        );
      } else {
        return [...prevCheckbox, { id, checked }];
      }
    });
  };

  const handleDataChange = (id: string, data: Date) => {
    setDataExist((prevData) => {
      const exists = prevData.some((item) => item.id === id);

      if (exists) {
        return prevData.map((item) =>
          item.id === id ? { ...item, dataexist: data } : item,
        );
      } else {
        return [...prevData, { id, dataexist: data }];
      }
    });
  };

  const formatDate = (date?: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

  const getUsers = async () => {
    const data = await getListUsers();
    setUsers(data);
    setAllUsers(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

      const debounce = (func: (...args: any[]) => void, delay: number) => {
      let timer: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      toast.success("Jogador deletado com sucesso!");
      //getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar jogador");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = checkbox.map((item) => ({
      id: item.id,
      monthlypayment: item.checked, // true se marcado, false se desmarcado
    }));

    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Jogadores atualizados com sucesso!");
      getUsers();
    } else {
      toast.error("Erro ao atualizar");
      setLoading(false);
    }
  };

      const handleSearch = useMemo(
        () =>
          debounce((value: string) => {
            setSearch(value);
    
            if (value.trim() === "") {
              setUsers(allusers);
              return;
            }
    
            const filtered = allusers.filter((p) =>
              p.name.toLowerCase().includes(value.toLowerCase())
            );
            setUsers(filtered);
          }, 200),
        [allusers]
      );


  return (
    <>
      <h1 className="mx-3 mt-5 text-center text-xl font-bold capitalize">
        editar jogadores
      </h1>

      <div className="w-full py-4">
        <div className="flex w-full items-center px-2 py-4">
          <Input
            placeholder="Pesquisar por nome"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="mx-2 rounded-md border">
          <form onSubmit={handleSubmit}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Data de pagamento</TableHead>
                  <TableHead>Torna Mensalista</TableHead>
                  <TableHead>Excluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="mx-auto mt-4 animate-bounce text-4xl">
                        ⚽
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {!loading &&
                  users.length > 0 &&
                  users.map((player) => (
                    <TableRow key={player.id} className={`text-md capitalize`}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>
                        {new Date(player.birthday).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          className="w-full"
                          value={
                            formatDate(
                              dataexist.find((item) => item.id === player.id)?.dataexist ??
                              player.subscriptionExpiresAt
                            )
                          }
                          onChange={(e) =>
                            handleDataChange(player.id, new Date(e.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={
                            checkbox.find((item) => item.id === player.id)
                              ?.checked ?? player.monthlypayment
                          }
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(player.id, checked as boolean)
                          }
                          className="h-6 w-6"
                        />
                      </TableCell>
                      <TableCell>
                        <DialogApp
                          disabled={loading}
                          label="X"
                          onClick={() => handleDelete(player.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                {!loading && users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum jogador encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="p-4">
              <Button className="w-full" type="submit" disabled={loading}>
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUsers;
