'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user';

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
  const user = useUser();
  
  return (user) ? (
    <nav className="relative bg-white shadow-sm"> {/* ナビゲーション全体に影を追加 */}
      <div className="container mx-8 px-4 sm:px-6 lg:px-8"> {/* 中央揃えとパディング */}
        <div className="flex h-16"> {/* ナビゲーションの高さ */}
          <div className="flex">
            <ul className="flex items-center space-x-12"> {/* リンク間のスペースを増やす */}
              <li>
                <NavLink href="/events">イベント</NavLink>
              </li>
              <li>
                <NavLink href="/participants">参加者</NavLink>
              </li>
              <li>
                <NavLink href="/users">ユーザー</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  ) : (<></>);
}
