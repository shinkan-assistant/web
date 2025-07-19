"use client";

import Image from "next/image";
import {
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/components/contexts/user";

function AuthorizedHeader({user}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // メニューの外側をクリックしたら、メニューを閉じる
  useEffect(() => {
    const handleClickOutside = (e) => {
      e.preventDefault();
      if (menuRef.current && !menuRef.current.contains(e.target)) 
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });

  // ログアウトの処理
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  // メニューのオンオフを切り替える
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="gsi-material-button flex items-center justify-center rounded-md font-medium px-4 py-[6px] border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper flex items-center">
          <div className="gsi-material-button-icon">
            <Image
              src={user.photoURL}
              alt={user.email}
              width={28}
              height={28}
              className="block rounded-full"
            />
          </div>
          <span className="gsi-material-button-contents ml-2 tracking-widest">
            {user.displayName}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ログアウト
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function UnAuthorizedHeader() {
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <button
      onClick={handleSignIn}
      className="gsi-material-button flex items-center justify-center rounded-md font-medium px-4 py-2 border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper flex items-center">
        <div className="gsi-material-button-icon">
          <Image
            src="/icons/google.svg"
            alt="Google logo"
            width={24}
            height={24}
            className="block"
          />
        </div>
        <span className="gsi-material-button-contents ml-2">ログイン（登録）</span>
      </div>
    </button>
  );
}

export default function Header({title}) {
  const user = useUser();

  return (
    <header className="bg-sky-600 px-4 py-4 flex items-center justify-center">
      <div className="flex-initial text-4xl text-white font-semibold pl-4">{title}</div>
      <div className="flex-1"></div>
      <div className="flex-initial">
        {user ? (
          <AuthorizedHeader user = {user} />
        ) : (
          <UnAuthorizedHeader />
        )}
      </div>
    </header>
  );
}
