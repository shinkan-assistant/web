import "./globals.css";
import Header from "@/components/common/Header";
import { UserProvider } from "@/components/contexts/user";

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
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
