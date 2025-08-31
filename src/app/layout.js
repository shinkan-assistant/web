import "./globals.css";
import Header from "@/features/shared/components/sections/Header";
import { AuthUserProvider } from "@/features/user/stores/authUser";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default async function RootLayout({ children }) {
  const { authUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="ja">
      <body>
        <AuthUserProvider initialAuthUser={authUser}>
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
