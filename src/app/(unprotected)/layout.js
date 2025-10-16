'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/stores/sessions/authUser";
import SubRootLayout from "@/helpers/components/layouts/page";
import { UnAuthorizedHeader } from "@/helpers/components/layouts/page/Header";
import { EventsPageFilterEnum } from "@/components/event/templates/List";
import { signOut } from "@/helpers/auth/client";
import userService from "@/services/user";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();

  useEffect(() => {
    (async() => {
      if (authUser) {
        // ログインしている場合はイベント一覧ページに遷移する
        if (await userService.exists({email: authUser.email})) {
          if (window.location.pathname !== `/events?filter=${EventsPageFilterEnum.participating}`) {
            redirect(`/events?filter=${EventsPageFilterEnum.participating}`);
          }
        }
        // 仮ログインしている場合
        else {
          // ユーザー登録画面でない場合は、仮ログインを無効化する
          if (window.location.pathname !== "/user/register") {
            await signOut();
          }
        }
      }
    })();
  }, [authUser]);

  return (
    <SubRootLayout
      Header={UnAuthorizedHeader}
    >
      {children}
    </SubRootLayout>
  );
}
