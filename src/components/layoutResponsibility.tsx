import Link from "next/link";

import { NavMobile } from "./navMobile";



export const LayoutResponsibility = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  

  return (
    <div className="flex flex-col">
      {/* Header visível apenas em telas maiores */}
      <header className="z-10 hidden bg-primary p-4 dark:text-black lg:block">
        <div className="container mx-auto flex items-center justify-between lg:max-w-5xl">
          <h1 className="text-2xl font-bold">Estoque Fácil</h1>
          <div className="flex flex-row items-center">
            <nav className="flex flex-row items-center space-x-4">
              <Link
                href="/admin"
                className="hover:bg-opacity-200 rounded-md p-2 hover:bg-white"
              >
                Início
              </Link>
              <Link
                href="/admin/repositorie"
                className="hover:bg-opacity-200 rounded-md p-2 hover:bg-white"
              >
                Repositories
              </Link>
              <Link
                href="/admin/produto"
                className="hover:bg-opacity-200 rounded-md p-2 hover:bg-white"
              >
                Estoque
              </Link>
              <Link
                href="/admin/categoria"
                className="hover:bg-opacity-200 rounded-md p-2 hover:bg-white"
              >
                Categorias
              </Link>
              <Link
                href="/admin/venda"
                className="hover:bg-opacity-200 rounded-md p-2 hover:bg-white"
              >
                Vendas
              </Link>

              
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow lg:container lg:mx-auto lg:max-w-5xl lg:pb-4">
        {children}
      </main>

      {/* Footer visível apenas em telas maiores */}
      <footer className="fixed bottom-0 hidden h-12 w-full bg-zinc-900 p-4 text-white lg:block">
        <div className="container mx-auto text-center lg:max-w-5xl">
          <p>
            &copy; {new Date().getFullYear()} Estoque Fácil App. Todos os
            direitos reservados.
          </p>
        </div>
      </footer>

      {/* Menu inferior visível apenas em telas pequenas */}
      <NavMobile />
    </div>
  );
};
