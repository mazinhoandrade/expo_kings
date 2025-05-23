"use client"
 import * as React from "react"
import { toast } from "sonner"

import {  getListUsers } from "@/app/_data/get-users-player"
import { User } from "@/app/types/user"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import DialogApp from "../dialogApp"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

type CheckboxItem = {
    id: string;
    checked: boolean;
};

const EditUsers = () => {
  const [users, setUsers] = React.useState<Omit<User, 'statistics'>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  const [checkbox, setCheckbox] = React.useState<CheckboxItem[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckbox((prevCheckbox) => {
      const exists = prevCheckbox.some((item) => item.id === id);
  
      if (exists) {
        return prevCheckbox.map((item) =>
          item.id === id ? { ...item, checked } : item
        );
      } else {
        return [...prevCheckbox, { id, checked }];
      }
    });
  };




  const getUsers = async () => {
    const data = await getListUsers();
    setUsers(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      toast.success('Jogador deletado com sucesso!')
      //getUsers();
    } catch (error) {
      console.error(error)
      toast.error('Erro ao deletar jogador')
      setLoading(false);
    }
  }

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



  const handleSearch = async (e: string) => {
    setSearch(e);
    const playerFilter = users.filter((play) =>
      play.name.toLowerCase().includes(e.toLowerCase()),
    );
    if (e === "") {
      getUsers();
    }
    setUsers(playerFilter);
  };
  
  return (
    <>
    <h1 className='text-xl font-bold text-center mx-3 mt-5 capitalize'>editar jogadores</h1>
    
    <div className="w-full py-4">

      <div className="flex items-center px-2 w-full py-4">
        <Input
          placeholder="Pesquisar por nome"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="rounded-md border mx-2">
        <form onSubmit={handleSubmit}>
          <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Nome</TableHead>
                   <TableHead>Torna Mensalista</TableHead>
                   <TableHead>Excluir</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    <div className="animate-bounce mx-auto mt-4 text-4xl">⚽</div>
                    </TableCell>
                  </TableRow>
                )}
                 {!loading && users.length > 0 && users.map(player => (
                   <TableRow key={player.id} className={`capitalize text-md`}>
                   <TableCell>{player.name.split(" ")[0]}</TableCell>
                   <TableCell>
                   <Checkbox
                     checked={
                        checkbox.find((item) => item.id === player.id)?.checked ?? player.monthlypayment
                      }
                     onCheckedChange={(checked) => handleCheckboxChange(player.id, checked as boolean)}
                     className="w-6 h-6"
                    />
                   </TableCell>
                   <TableCell>
                   <DialogApp disabled={loading} label="Excluir" onClick={() => handleDelete(player.id)} />
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
             <div className="p-4"><Button className="w-full" type="submit" disabled={loading}>Salvar</Button></div>
             </form>
      </div>
    </div>
  
    </>
  )
}

export default EditUsers