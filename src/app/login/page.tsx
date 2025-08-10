"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const errorParam = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Redirection serveur immédiate vers le dashboard si succès
    await signIn("credentials", {
      redirect: true,
      callbackUrl,
      email,
      password,
    });
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border rounded p-2"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {(error || errorParam) && (
          <p className="text-red-600 text-sm">Identifiants invalides</p>
        )}
        <button className="w-full bg-black text-white rounded p-2" type="submit">
          Se connecter
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Pas de compte ? <Link className="underline" href="/signup">Créer un compte</Link>
      </p>
    </div>
  );
}


