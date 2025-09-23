import Header from "@/components/Header";
import "./globals.css";
import { Roboto, Poppins } from "next/font/google";
export const metadata = {
  title: "Todo App",
  description:
    "A simple and intuitive Todo App to organize, track, and manage your tasks efficiently, helping you stay productive every day.",
  icons: {
    icon: "/todoIcon.webp",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
  variable: "--font-roboto", // custom CSS variable
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="min-h-screen flex flex-col">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
