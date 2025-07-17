"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Credenciales incorrectas o usuario no existe");
    } else {
      router.push("/tablero");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6 max-w-md w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 drop-shadow-md pop-in mb-2">
          Iniciar Sesión
        </h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-green-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {error && <span className="text-red-600 text-sm font-semibold mt-1">{error}</span>}
        </form>
        <a
          href="/register"
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          ¿No tienes cuenta? Regístrate
        </a>
      </div>
    </main>
  );
}
