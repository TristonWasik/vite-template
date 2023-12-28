import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";

/**
 * App layout
 * @returns
 */
export default function Layout() {
  return (
    <div className="m-auto max-w-[1200px]">
      <header className="flex p-4 place-items-center">
        <h1 className="flex-1 font-bold text-xl">Site Header</h1>
        <nav className="flex gap-2 flex-1">
          <Link to="/">Home</Link>
          <Link to="/Profile">Profile</Link>
        </nav>
        <div>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
          <SignedOut>
            <SignInButton redirectUrl="/profile" mode="modal" />
          </SignedOut>
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
