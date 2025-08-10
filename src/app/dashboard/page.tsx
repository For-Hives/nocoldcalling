"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white">

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


