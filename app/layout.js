import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const compactaBT = localFont({
  src: [
    {
      path: "../public/fonts/compacta/Compacta-BT.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-compacta",
  display: "swap",
});

export const metadata = {
  title: "SOS Entrepreneur",
  description: "Programme d'accompagnement pour les entrepreneurs au Bénin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${compactaBT.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
