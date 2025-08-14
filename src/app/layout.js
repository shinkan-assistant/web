import "./globals.css";
import Header from "@/features/shared/components/organisms/Header";
import { AuthUserProvider } from "@/features/user/stores/authUser";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default async function RootLayout({ children }) {
  const { authUser } = await getAuthenticatedAppForUser();
  const initialAuthUser = authUser ? {
    email: authUser.email,
    displayName: authUser.displayName,
    photoURL: authUser.photoURL,
  } : null;

  return (
    <html lang="ja">
      <body>
        <AuthUserProvider initialAuthUser={initialAuthUser}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <Header title={metadata.title}/>
          </div>

          <div className="pt-[74px]">
            {children}
          </div>
        </AuthUserProvider>
      </body>
    </html>
  );
}
