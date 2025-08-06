import Header from "@/client/components/common/Header";
import { LoginUserProvider } from "@/client/contexts/loginUser";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export default async function RootLayout({ children, metadata }) {
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
