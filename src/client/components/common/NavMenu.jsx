'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/client/contexts/authUser';
import { useEffect, useState } from 'react';
import { getUserMetadataByEmail } from '@/data/functions/user';
import { db } from '@/lib/firebase/clientApp';
import { EventFilterEnum } from '@/data/enums/event';

function NavLink ({ href, children }) {
  const router = useRouter();
  // 現在のパスとhrefが一致するか、または現在のパスがhrefで始まる場合にアクティブとみなす
  // 例: /users と /users/profile など
  const isActive = router.pathname === href || router.pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`
        relative px-4 py-3 text-base font-semibold transition-all duration-300 ease-in-out
        ${isActive
          ? 'text-sky-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full after:scale-x-100' // アクティブな場合、下線が伸びるエフェクト
          : 'text-gray-600 hover:text-sky-600 hover:bg-gray-50 focus:outline-none after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-sky-600 after:rounded-full after:transition-all after:duration-300 hover:after:w-full'} // 非アクティブな場合、ホバーで下線が伸びる
      `}
    >
      {children}
    </Link>
  );
}

export default function NavMenu() {
  const authUser = useAuthUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // TODO ユーザーメタデータをサーバー側で変更しても、すぐに反映されない、、
  useEffect(() => {
    // ログインユーザーが存在しない場合は処理を終了
    if (!authUser) {
      return;
    }

    // ログインユーザーのメールアドレスを使って管理者情報を取得
    const fetchUserInfo = async () => {
      const userMetadata = await getUserMetadataByEmail(db, { email: authUser.email });
      if (userMetadata) {
        if (userMetadata['is_admin']) 
          setIsAdmin(true);
        if (userMetadata['belong']['is_member'])
          setIsMember(true);
      }
    };

    fetchUserInfo();
  }, [authUser]); // authUserが変更されたときに再実行

  const navLinkInfos = [
    {
      href: `/events?filter=${EventFilterEnum.participating}`, 
      title: "参加予定", 
      isOnlyForAdmin: false, isOnlyForMember: false
    },
    {
      href: `/events?filter=${EventFilterEnum.registrable}`, 
      title: "申込可能", 
      isOnlyForAdmin: false, isOnlyForMember: false
    },
    {
      href: `/events?filter=${EventFilterEnum.organizer}`, 
      title: "イベント管理", 
      isOnlyForAdmin: false, isOnlyForMember: true
    },
    {
      href: "/users", 
      title: "ユーザー管理", 
      isOnlyForAdmin: true
    },
  ].filter(info => {
    if (info.isOnlyForAdmin && !isAdmin) return false;
    if (info.isOnlyForMember && !isMember) return false;
    return true;
  });

  if (!(authUser && navLinkInfos.length > 1))
    return (<></>);
  
  return (
    <nav className="relative bg-white shadow-md"> {/* ナビゲーション全体に影を追加 */}
      <div className="container mx-8 px-4 sm:px-6 lg:px-8"> {/* 中央揃えとパディング */}
        <div className="flex h-16"> {/* ナビゲーションの高さ */}
          <div className="flex">
            <ul className="flex items-center space-x-12"> {/* リンク間のスペースを増やす */}
              {navLinkInfos.map(info => (
                <li key={info.title}>
                  <NavLink href={info.href}>{info.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
