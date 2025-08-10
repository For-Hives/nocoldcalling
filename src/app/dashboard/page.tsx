"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white">
      <TopNav userEmail={session?.user?.email ?? undefined} />

      <header
        className="h-72 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1600&auto=format&fit=crop)",
        }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-4xl font-extrabold tracking-tight">Main features</h2>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            href="#"
            title="Browse offers"
            img="https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1200&auto=format&fit=crop"
          />
          <FeatureCard
            href="#"
            title="Post a need"
            img="https://images.unsplash.com/photo-1518085250887-2f903c200fee?q=80&w=1200&auto=format&fit=crop"
          />
          <FeatureCard
            href="#"
            title="Messenger"
            img="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
          />
        </section>
      </main>
    </div>
  );
}

function TopNav({ userEmail }: { userEmail?: string }) {
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

function FeatureCard({ title, img, href }: { title: string; img: string; href: string }) {
  return (
    <Link
      href={href}
      className="group relative block h-56 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-3xl font-extrabold leading-none text-white drop-shadow">{title}</h3>
      </div>
    </Link>
  );
}


