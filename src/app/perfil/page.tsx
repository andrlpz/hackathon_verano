"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DeleteAccountButton from "./DeleteAccountButton";

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  if (!user) return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6 max-w-md w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-3xl font-bold text-red-600 mb-4">No has iniciado sesión</h1>
        <a href="/login" className="text-blue-600 hover:underline text-lg">Inicia sesión</a>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6 max-w-md w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-400 to-yellow-400 drop-shadow-md pop-in mb-2">
          Perfil de Jugador
        </h1>
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="text-lg font-semibold text-gray-700">Correo: <span className="text-blue-600">{user.email}</span></span>
          <span className="text-xs text-gray-500">ID: {user.id}</span>
          {/* Aquí podrías mostrar stats reales en el futuro */}
        </div>
        <p className="text-gray-600 mt-4 fade-in">¡Personaliza tu perfil próximamente!</p>
        <hr className="my-4 w-full border-gray-300" />
        <DeleteAccountButton onDeleted={() => window.location.href = "/"} />
      </div>
    </main>
  );
}
