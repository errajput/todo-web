import "./globals.css";
export const metadata = {
  title: "Todo App",
  description: "Add Your Todo Here",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
