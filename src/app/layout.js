import "./globals.css";
import Header from "@/components/common/Header";
import NavMenu from "@/components/common/NavMenu";
import { UserProvider, useUser } from "@/contexts/user";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <UserProvider>
          <Header title={metadata.title}/>
          <NavMenu />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
