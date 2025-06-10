import { Poppins } from "next/font/google";
import "./globals.css";
import Mainlayout from "@/layout/Mainlayout";

const PoppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400"
});

export const metadata = {
  title: "Hassy Banking Application",
  description: "Banking system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${PoppinsFont.variable}`} suppressHydrationWarning>
        <Mainlayout>{children}</Mainlayout>
      </body>
    </html>
  );
}
