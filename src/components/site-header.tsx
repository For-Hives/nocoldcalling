"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? undefined;

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold">NC</span>
          </Link>
          <ul className="hidden items-center gap-5 text-sm text-gray-700 sm:flex">
            <li><Link className="hover:text-black" href="#">Post a need</Link></li>
            <li><Link className="hover:text-black" href="#">Browse offers</Link></li>
            <li><Link className="hover:text-black" href="#">Suppliers catalog</Link></li>
            <li><Link className="hover:text-black" href="#">Discussion Forum</Link></li>
            <li><Link className="hover:text-black" href="#">Messenger</Link></li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200"
          >
            <span className="absolute right-1 top-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
            <span className="sr-only">Notifications</span>
            •
          </button>
          <div className="hidden items-center text-sm text-gray-600 sm:flex">
            {userEmail ? <span className="mr-2 truncate max-w-[10rem]">{userEmail}</span> : null}
            <Button asChild variant="secondary">
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-700">
            <span className="text-xs font-semibold">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
}


