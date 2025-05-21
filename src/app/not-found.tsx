import Image from "next/image";


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image
                src="/ball.png"
                alt="Página não encontrada"
                width={200}
                height={200}
            />
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-lg">Página não encontrada</p>
        </div>
    );
}