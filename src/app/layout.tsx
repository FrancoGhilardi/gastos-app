"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
// import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Control de Gastos Personales",
//   description: "Aplicación para controlar tus gastos personales",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <SessionProvider>
          {/* <AuthProvider> */}
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#374151",
                color: "#fff",
              },
            }}
          />
          {/* </AuthProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
