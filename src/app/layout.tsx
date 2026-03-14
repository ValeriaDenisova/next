import { Roboto, Aguafina_Script } from "next/font/google";
import "@styles/index.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const aguafina = Aguafina_Script({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className} ${aguafina.className}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
