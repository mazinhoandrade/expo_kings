import { Avatar } from "@radix-ui/react-avatar";
import { ShieldCheck } from "lucide-react";
import React from "react";

import { AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  image: string;
  name: string;
  isMonthly: boolean;
}
const AvatarCover = ({ image, name, isMonthly }: Props) => {
  console.log(isMonthly);
  return (
    <Avatar className={`flex flex-col items-center`}>
      <AvatarImage
        src={image}
        className={`h-10 w-10 rounded-full md:h-full md:w-full ${isMonthly ? "border-full border-3 border-blue-500 shadow-2xl" : ""}`}
      />
      <AvatarFallback>{name}</AvatarFallback>
      <p className="rounded-xl bg-white p-1 text-xs font-bold text-black capitalize shadow-2xl">
        {name.split(" ")[0]}
      </p>
    </Avatar>
  );
};

export default AvatarCover;
