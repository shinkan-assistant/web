import { MetadataProvider } from "@/stores/consts/metadata";
import "./globals.css";
import { AuthUserProvider } from "@/stores/sessions/authUser";
import { ToastContainer } from "react-toastify";
import { MyUserProvider } from "@/stores/contexts/myUser";
import { Suspense } from "react";

export default async function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <MetadataProvider>
          <AuthUserProvider>
            <MyUserProvider>
              <ToastContainer />
                <Suspense fallback={<div>読み込み中です</div>}>
                  {children}
                </Suspense>
            </MyUserProvider>
          </AuthUserProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}
