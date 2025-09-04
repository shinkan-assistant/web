import { MetadataProvider } from "@/features/shared/stores/metadata";
import "./globals.css";
import { AuthUserProvider } from "@/features/user/stores/authUser";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { ToastContainer } from "react-toastify";

export default async function RootLayout({ children }) {
  const { authUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="ja">
      <body>
        <MetadataProvider>
          <AuthUserProvider initialAuthUser={authUser}>
            <ToastContainer />
            {children}
          </AuthUserProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}
