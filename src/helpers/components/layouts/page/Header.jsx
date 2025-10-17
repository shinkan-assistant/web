'use client';

import Image from "next/image";
import {
  deleteUser,
  signInWithGoogle,
  signOut,
} from "@/helpers/auth/client";
import { useEffect, useRef, useState } from "react";
import { useLoadedAuthUser } from "@/stores/sessions/authUser";
import { useMyUser } from "@/stores/contexts/myUser";
import { useMetadata } from "@/stores/consts/metadata";
import { useRouter } from "next/navigation";
import Link from "next/link";
import userService from "@/services/user";

// --- HeaderContainer: 変更なし ---
export function HeaderContainer({children}) {
  const { title } = useMetadata();

  return (
    <header className="bg-white px-4 py-3 flex items-center shadow-sm border-b border-slate-200">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="flex-initial text-2xl text-slate-800 font-bold">{title}</Link>
        <div className="flex-1"></div>
        <div className="flex-initial">
          {children}
        </div>
      </div>
    </header>
  );
}

// --- AuthorizedHeader: より洗練されたデザインに更新 ---
function AuthorizedHeader() {
  const router = useRouter();

  const loadedAuthUser = useLoadedAuthUser();

  const initialMyUser = useMyUser();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const [myUser, setMyUser] = useState(initialMyUser);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    (async () => {
      if (!loadedAuthUser) return;
      const authUser = loadedAuthUser.get();

      if (authUser) {
        setMyUser(await userService.get({email: authUser.email}));
      }
    })();
  }, [loadedAuthUser]);

  if (!loadedAuthUser?.get() || !myUser) {
    return <HeaderContainer><div className="w-48 h-9 bg-slate-200 rounded-full animate-pulse"></div></HeaderContainer>;
  }
  const authUser = loadedAuthUser.get();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  }

  const handleDeleteUser = async () => {
    await deleteUser();
    router.push('/');
  }

  const menuInfos = [
    {
      label: "ログアウト",
      Icon: (
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
      ),
      onClick: handleSignOut,
    },
    {
      label: "退会",
      Icon: (
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
        >
          <circle cx="12" cy="7" r="3"></circle>
          <path d="M17 19c0-2.209-2.686-4-6-4S5 16.791 5 19"></path>
          <line x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
      ),
      onClick: handleDeleteUser,
    },
  ];

  return (
    <HeaderContainer>
      <div className="relative" ref={menuRef}>
        {/* --- ユーザーアイコンボタン (ホバー/フォーカスエフェクト強化) --- */}
        <button
          onClick={toggleMenu}
          className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 transform hover:scale-105"
        >
          <Image
            src={authUser.photoURL}
            alt={authUser.email}
            width={32}
            height={32}
            className="block rounded-full"
          />
          <span className="text-sm font-medium text-slate-700 hidden pr-2 sm:block">
            {`${myUser["family_name"]} ${myUser["given_name"]}`}
          </span>
        </button>

        {/* --- ドロップダウンメニュー (デザインを大幅に改善) --- */}
        <div
          className={`absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-10 transition-all duration-200 ease-out transform
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`
          }
        >
          {menuInfos.map((info, index) => (
            <div key={index} className="p-1">
              <button
                onClick={info.onClick}
                className="flex items-center w-full text-left p-2 text-sm rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                {info.Icon}
                {info.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </HeaderContainer>
  );
}

// --- UnAuthorizedHeader: 変更なし ---
function UnAuthorizedHeader() {
  const loadedAuthUser = useLoadedAuthUser();
  if (!loadedAuthUser) return;
  const authUser = loadedAuthUser.get();

  return (
    <HeaderContainer>
      {!authUser && 
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center rounded-lg font-semibold px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 transition-colors duration-300"
        >
          <Image
            src="/icons/google.svg"
            alt="Google logo"
            width={20}
            height={20}
            className="block"
          />
          <span className="ml-2 text-sm">ログイン</span>
        </button>
      }
    </HeaderContainer>
  );
}

export { AuthorizedHeader, UnAuthorizedHeader };