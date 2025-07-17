'use client';

import NavLink from "./Link";

export default function NavMenu() {
  return (
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
  );
}
