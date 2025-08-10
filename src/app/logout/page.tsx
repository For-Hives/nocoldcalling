"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <div className="mx-auto max-w-md p-6 text-center">
      <p className="text-gray-700">Déconnexion en cours…</p>
    </div>
  );
}


