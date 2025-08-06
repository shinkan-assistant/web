import Header from "@/client/components/common/Header";
import { UserProvider } from "@/client/contexts/user";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export default async function RootLayout({ children, metadata }) {
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
