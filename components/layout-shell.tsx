"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
