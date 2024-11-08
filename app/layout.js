import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export const metadata = {
  title: "Ateliê da Mirumuh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="icon" href="/icons/iconMirumuh_topRosa_marrom.png" />
      </head>
      <body
        className={` antialiased background`}
      >
        {children}
      </body>
    </html>
  );
}
