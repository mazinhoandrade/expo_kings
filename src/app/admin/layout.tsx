import { getServerSession } from "next-auth";

import Header from "@/components/header";

import { authOptions } from "../_lib/auth";
import NotFoundAdmin from "./not-found";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NotFoundAdmin();
  }
  return <>
  <Header/>
  <div className="w-full p-2 pb-10 overflow-x-hidden mb-20">
  {children}
  </div>
  </>;
}
