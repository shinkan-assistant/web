import "./globals.css";
import Header from "@/components/common/header/Header";
import NavMenu from "@/components/common/nav/Menu";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header title={metadata.title}/>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
