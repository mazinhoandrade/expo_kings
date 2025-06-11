"use client";
import { CheckCircle2 } from "lucide-react";
import React from "react";

import useMercadoPago from "@/app/hooks/useMercadoPago";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader } from "../ui/card";

const features = [
  "Prioridade na Lista",
  "Sorteios Exclusivos",
  "Coletes em Primeira Mão",
  "Card de Estatística Personalizado",
  "Um desconto de 2 reais no preço da babá",
];
import { User } from "@/app/types/user";

type Props = {
  User: User;
};

const InscriptionAlert = ({ User }: Props) => {
  const { createMercadoPagoCheckout } = useMercadoPago();
  const [open, setOpen] = React.useState(true);

  const handleSubscribe = async () => {
    createMercadoPagoCheckout({
      testeId: User.id,
      userEmail: User.email,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assine Agora</DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Mensalista ExpoKing</h3>
              </div>

              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-blue-900">
                  R$10,19
                </span>
                <span className="text-primary ml-1">/ mês</span>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 border-t border-gray-200 pt-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Não Quero</Button>
            </DialogClose>
            <Button
              type="submit"
              className="animate-pulse border-2 border-blue-900 text-blue-900"
              onClick={handleSubscribe}
            >
              Assinar Agora
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default InscriptionAlert;
