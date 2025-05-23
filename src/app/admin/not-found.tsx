import Image from "next/image";

import SignInDialog from "@/components/sign-in-dialog";

export default function NotFoundAdmin() {
    return (
        <div className="flex flex-col items-center justify-center h-auto mb-20">
            <Image
                src="/ball.png"
                alt="Página não encontrada"
                width={200}
                height={200}
            />
            <h1 className="text-4xl font-bold mb-4">Area Restrita - 404</h1>
            <p className="text-lg">Faça login para acessar essa pagina</p>
            <div className="p-4 bg-zinc-700 rounded-xl"><SignInDialog /></div>
        </div>
    );
}