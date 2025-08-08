import "./globals.css";
import Header from "@/features/shared/components/organisms/Header";
import { UserProvider } from "@/features/user/stores/authUser";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default async function RootLayout({ children }) {
  const { authUser } = await getAuthenticatedAppForUser();
  const initialAuthUser = authUser ? {
    uid: authUser.uid,
    email: authUser.email,
    displayName: authUser.displayName,
    photoURL: authUser.photoURL,
  } : undefined;

  return (
    <html lang="ja">
      <body>
        <UserProvider initialAuthUser={initialAuthUser}>
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
