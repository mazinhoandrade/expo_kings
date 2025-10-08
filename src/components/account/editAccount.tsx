"use client";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import useMercadoPago from "@/app/hooks/useMercadoPago";
import { User } from "@/app/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  User: User;
};

const positions = ["GOLEIRO", "ALA", "PIVO", "FIXO", "CORINGA"];
const EditAccount = ({ User }: Props) => {
  const { createMercadoPagoCheckout } = useMercadoPago();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(User.name);
  const [position, setPosition] = useState<string>(User?.position);
  const [date, setDate] = useState<Date | undefined>(User?.birthday);

  const handleSubscribe = async () => {
    createMercadoPagoCheckout({
      testeId: User.id,
      userEmail: User.email,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!name || !position || !date) {
      toast.error("Preencha todos os campos!");
      setLoading(false);
      return;
    }
    const res = await fetch(`/api/users/${User.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        position,
        birthday: date,
      }),
    });

    if (res.ok) {
      toast.success("Perfil atualizado com sucesso!");
      window.location.reload();
    } else {
      const data = await res.json();
      toast.error(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Card>
        <div className="flex justify-between px-3">
          <Image
            className="rounded-full"
            src={User.image}
            alt={User.name}
            width={105}
            height={105}
            quality={100}
          />
          <div className="ml-2 w-full space-y-1">
            <h1 className="flex items-center text-2xl font-bold">
              {User.name}{" "}
              {User.monthlypayment && <ShieldCheck className="text-blue-500" />}
            </h1>
            <p>
              Posição: <span className="capitalize">{User.position}</span>
            </p>
            <div className="flex justify-between">
              {User.monthlypayment ? (
                <p className="w-fit rounded-md bg-blue-900 p-1 text-sm">
                  Mensalista
                </p>
              ) : (
                <Button
                  onClick={handleSubscribe}
                  disabled={loading || User.monthlypayment}
                >
                  Assinar Mensalidade
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      <h1 className="text-xl">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
        <Label>Nome:</Label>
        <Input
          type="text"
          name="name"
          placeholder={User.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Aniversário:</Label>
        <Input
          type="date"
          name="date"
          value={date?.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <Label>Posição:</Label>
        <Select
          defaultValue={User.position.toString()}
          onValueChange={(value) => {
            setPosition(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tempo de Descanso: DESATIVADO" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((option) => (
              <SelectItem value={option.toString()} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button disabled={loading} type="submit">
          Salvar
        </Button>
      </form>
      {User.admin && (
        <Link href="/account/editusers">
          <Button variant={"outline"} className="mt-2 w-full">
            Editar Players
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EditAccount;
