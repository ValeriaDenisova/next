"use client";
import { Roboto } from "next/font/google";
import { RootStoreProvider } from "@store/globals/root/RootStore";
import Header from "@components/Header";
import "@styles/index.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${roboto.className} antialiased`}>
      <RootStoreProvider>
        <Header />
        {children}
      </RootStoreProvider>
    </div>
  );
}
