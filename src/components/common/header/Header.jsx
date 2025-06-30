"use client";
import {
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth";
import useUserSession from "./UserSession";

function AuthorizedHeader({user}) {
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <p>
        <img
          className="profileImage"
          src={user.photoURL || "/profile.svg"}
          alt={user.email}
        />
        {user.displayName}
      </p>

      <div className="menu">
        ...
        <ul>
          <li>{user.displayName}</li>

          <li>
            <a href="#" onClick={handleSignOut}>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

function UnAuthorizedHeader() {
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <>
      <a href="#" onClick={handleSignIn}>
        Sign In with Google
      </a>
    </>
  )
}

export default function Header({ initialUser }) {
  const user = useUserSession(initialUser);

  return (
    <header>
      <div className="profile">
        {user ? (
          <AuthorizedHeader user = {user} />
        ) : (
          <UnAuthorizedHeader />
        )}
      </div>
    </header>
  );
}
