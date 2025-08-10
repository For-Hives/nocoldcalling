"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"COMMERCIAL" | "PROFESSIONAL">("PROFESSIONAL");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur lors de l'inscription");
      return;
    }
    setSuccess("Compte créé. Vous pouvez vous connecter.");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer un compte</h1>
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
          placeholder="Mot de passe (min 8)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Nom (optionnel)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="w-full border rounded p-2"
          value={role}
          onChange={(e) => setRole(e.target.value as "COMMERCIAL" | "PROFESSIONAL")}
        >
          <option value="PROFESSIONAL">Professionnel</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <button className="w-full bg-black text-white rounded p-2" type="submit">
          S&apos;inscrire
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Déjà un compte ? <Link className="underline" href="/login">Se connecter</Link>
      </p>
    </div>
  );
}


