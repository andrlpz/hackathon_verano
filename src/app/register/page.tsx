"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message || "Error al registrar usuario");
    } else {
      router.push("/login");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6 max-w-md w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-green-500 drop-shadow-md pop-in mb-2">
          Registrarse
        </h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-yellow-200 focus:ring-2 focus:ring-yellow-300 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-yellow-200 focus:ring-2 focus:ring-yellow-300 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-yellow-200 focus:ring-2 focus:ring-yellow-300 outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300 mt-2"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          {error && <span className="text-red-600 text-sm font-semibold mt-1">{error}</span>}
        </form>
        <a
          href="/login"
          className="text-yellow-700 hover:underline text-sm mt-2"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </a>
      </div>
    </main>
  );
}


