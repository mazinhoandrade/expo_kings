import { getServerSession } from "next-auth";

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
  return <>{children}</>;
}
