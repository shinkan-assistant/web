'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventsPageFilterEnum from "@/features/event/components/const/listPageFilterEnum";
import { useMyUser } from '@/stores/contexts/myUser';

function NavLink({ href, children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // フルパスを正しく取得
  const fullPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  // 現在のパスとhrefが一致するか、または現在のパスがhrefで始まる場合にアクティブとみなす
  const isActive = fullPath === href || fullPath?.startsWith(`${href}`);

  const commonClassName = "relative px-4 py-3 text-base font-semibold transition-all duration-300 ease-in-out"

  return (
    <>
      {isActive ? 
        <div className={`${commonClassName} text-sky-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full after:scale-x-100`}>
          {children}
        </div>
      :
        <Link
          href={href}
          className={`${commonClassName} text-gray-600 hover:text-sky-600 hover:bg-gray-50 focus:outline-none after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-sky-600 after:rounded-full after:transition-all after:duration-300 hover:after:w-full`}
        >
          {children}
        </Link>
      }
    </>    
  );
}

export default function NavMenu() {
  const myUser = useMyUser();

  const [navLinkInfos, setNavLinkInfos] = useState(null);

  useEffect(() => {
    if (!myUser) {
      setNavLinkInfos(null);
      return;
    }

    const isAdmin = myUser["is_admin"];
    const isMember = myUser["belong"]["is_member"];

    const allNavLinkInfos = [
      {
        href: `/events?filter=${EventsPageFilterEnum.participating}`, 
        title: "参加予定", 
        isOnlyForAdmin: false, isOnlyForMember: false
      },
      {
        href: `/events?filter=${EventsPageFilterEnum.apply}`, 
        title: "申込可能", 
        isOnlyForAdmin: false, isOnlyForMember: false
      },
      {
        href: `/events?filter=${EventsPageFilterEnum.manage}`, 
        title: "イベント管理", 
        isOnlyForAdmin: false, isOnlyForMember: true
      },
      {
        href: "/circle/members", 
        title: "ユーザー管理", 
        isOnlyForAdmin: true
      },
    ];
    setNavLinkInfos(
      allNavLinkInfos.filter(info => {
        if (info.isOnlyForAdmin && !isAdmin) return false;
        if (info.isOnlyForMember && !isMember) return false;
        return true;
      })
    );
  }, [myUser?.["email"]]);

  if (!navLinkInfos) {
    return <></>
  }

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
