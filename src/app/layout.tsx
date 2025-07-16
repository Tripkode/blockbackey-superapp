"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/NavbarSection";
import { CryptoLayout, useSidebar } from "@/components/principal/LayoutSidebar";
import { GeistSans } from 'geist/font/sans';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Componente interno para manejar el estado del sidebar
function AppContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <Navbar 
        sidebarOpen={sidebarOpen} 
        onToggleSidebar={toggleSidebar} 
      />
      <CryptoLayout 
        sidebarOpen={sidebarOpen} 
        onToggleSidebar={toggleSidebar}
      >
        {children}
      </CryptoLayout>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={GeistSans.className}
      >
        <AppContent>
          {children}
        </AppContent>
      </body>
    </html>
  );
}