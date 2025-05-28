"use client";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

import { UserBrithdayMonth } from "@/app/types/user";

import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const BirthdayMonth = () => {
  //const usersBrithday = await getUserBrithdayMonth();
  const [usersBrithday, setUsersBrithday] = React.useState<UserBrithdayMonth[]>(
    [],
  );

  const [looding, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsersBrithday(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <h1 className="mx-3 mt-5 text-center text-xl font-bold capitalize">
        aniversariante(s) do mês 🎉
      </h1>
      <ScrollArea className="my-2 w-full lg:px-2">
        <ScrollBar orientation="horizontal" className="invisible" />
        <div className="flex w-max gap-2 space-x-2 py-5">
          {looding && (
            <>
              <Skeleton className="h-60 w-40" />
              <Skeleton className="h-60 w-40" />
              <Skeleton className="h-60 w-40" />
            </>
          )}
          {!looding &&
            usersBrithday.length > 0 &&
            usersBrithday?.map((user) => (
              <Card
                className={`relative w-auto px-2 ${user.monthlypayment && "border-2 border-blue-500"}`}
                key={user.id}
              >
                <Image
                  className="rounded-2xl"
                  src={user.image}
                  alt=""
                  objectFit="cover"
                  width={150}
                  height={150}
                />
                <span className="absolute top-[-10px] right-[-10px] h-10 w-10 rounded-full bg-yellow-500 p-2 text-center font-bold">
                  {user.birthday}
                  {/* {user?.birthday.toLocaleDateString("pt-BR", {
                    day: "numeric",
                    timeZone: "UTC",
                  })} */}
                </span>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="flex items-center gap-1 text-lg font-bold capitalize">
                    {user.name.toString().split(" ")[0]}{" "}
                    {user.monthlypayment && (
                      <ShieldCheck className="text-blue-500" />
                    )}
                  </h1>
                  <p className="text-sm capitalize">{user.position}</p>
                </div>
              </Card>
            ))}
        </div>
      </ScrollArea>
      {!looding && usersBrithday.length === 0 && (
        <h1 className="text-center text-sm">Nenhum aniversariante no mês</h1>
      )}
    </>
  );
};

export default BirthdayMonth;
