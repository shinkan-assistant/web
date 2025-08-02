import "./globals.css";
import Header from "@/components/common/Header";
import { LoginUserProvider } from "@/contexts/loginUser";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default async function RootLayout({ children }) {
  const { loginUser } = await getAuthenticatedAppForUser();
  const initialUser = loginUser ? {
    uid: loginUser.uid,
    email: loginUser.email,
    displayName: loginUser.displayName,
    photoURL: loginUser.photoURL,
  } : undefined;

  return (
    <html lang="ja">
      <body>
        <LoginUserProvider initialUser={initialUser}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <Header title={metadata.title}/>
          </div>

          <div className="pt-[74px]">
            {children}
          </div>
        </LoginUserProvider>
      </body>
    </html>
  );
}
