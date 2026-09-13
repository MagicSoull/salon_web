import type { Metadata } from "next";
import "./components/Header.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Арт-Медика — медико-косметологический центр",
  description: "Медико-косметологический центр Арт-Медика в Челябинске.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
