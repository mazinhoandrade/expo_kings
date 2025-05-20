"use client";

//import { Providers } from "@/app/_providers/transtackProvider";
//import { Toaster } from "@/src/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Providers> */}
      {children}
      {/* </Providers> */}
    </>
  );
}
