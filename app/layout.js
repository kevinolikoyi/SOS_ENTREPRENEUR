import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const CLARITY_PROJECT_ID = "wod9lgs9ar";

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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      </body>
    </html>
  );
}
