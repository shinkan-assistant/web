import { MetadataProvider } from "@/stores/consts/metadata";
import "./globals.css";
import { AuthUserProvider } from "@/stores/sessions/authUser";
import { getAuthUser } from "@/helpers/auth/server";
import { ToastContainer } from "react-toastify";
import { MyUserProvider } from "@/stores/contexts/myUser";

export default async function RootLayout({ children }) {
  const authUser = getAuthUser();

  return (
    <html lang="ja">
      <body>
        <MetadataProvider>
          <AuthUserProvider initialAuthUser={authUser}>
            <MyUserProvider>
              <ToastContainer />
              {children}
            </MyUserProvider>
          </AuthUserProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}
