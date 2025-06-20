"use client";

import type React from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@shared/ui/organisms";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {/* <TransactionProvider> */}
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
      {/* </TransactionProvider> */}
    </SessionProvider>
  );
}
