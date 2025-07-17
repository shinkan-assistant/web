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
        relative px-2 py-2 text-sm font-medium
        ${isActive
          ? 'text-indigo-600 border-b-2 border-indigo-600' // アクティブな場合
          : 'text-gray-700 border-b-2 border-gray-300 hover:border-gray-50 hover:text-gray-900'} // 非アクティブな場合
        focus:outline-none transition-colors duration-200
      `}
    >
      {children}
    </Link>
  );
}

export default function NavMenu() {
  const user = useUser();
  
  return (user) ? (
    <nav className="border-b border-gray-200 bg-white"> {/* navで囲み、下部に薄い線を追加 */}
      <ul className="flex gap-x-4">
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
    </nav>
  ) : (<></>);
}
