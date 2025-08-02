'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // redirect の代わりに useRouter をインポート
import { useLoginUser } from "@/contexts/loginUser";
import NavMenu from "@/components/common/NavMenu";

export default function ProtectedLayout({ children }) {
  const loginUser = useLoginUser();
  const router = useRouter(); // useRouter を使用

  useEffect(() => {
    if (!loginUser) {
      router.push('/'); // redirect('/') の代わりに router.push('/') を使用
    }
  }, [loginUser, router]); // router を依存配列に追加

  // ユーザーがいない場合は何も表示しない（リダイレクトが実行されるまでの間）
  if (!loginUser) {
    return null;
  }

  return (
    <>
      <div className="fixed left-0 right-0">
        <NavMenu />
      </div>
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </div>
    </>
  );
}