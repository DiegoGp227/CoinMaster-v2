import { SWRProvider } from "@/provier/swrProvider";
import "../styles/global.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "./components/layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FynUp",
  description: "FynUp - Gestión de proyectos y tareas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <SWRProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SWRProvider>
      </body>
    </html>
  );
}
