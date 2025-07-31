import "./globals.css";
import Header from "@/components/common/Header";
import { UserProvider } from "@/contexts/user";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default async function RootLayout({ children }) {
  const user = (await getAuthenticatedAppForUser()).currentUser;
  const initialUser = user ? {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  } : undefined;

  return (
    <html lang="ja">
      <body>
        <UserProvider initialUser={initialUser}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <Header title={metadata.title}/>
          </div>

          <div className="pt-[74px]">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
