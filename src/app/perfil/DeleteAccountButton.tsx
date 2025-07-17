"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DeleteAccountButton({ onDeleted }: { onDeleted?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.")) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    // Llama función edge o API para borrar el usuario, ya que el cliente JS no puede borrar cuentas directamente
    const session = await supabase.auth.getSession();
    const access_token = session.data.session?.access_token;
    if (!access_token) {
      setError("No se pudo obtener la sesión actual.");
      setLoading(false);
      return;
    }
    // Llama a la API de Supabase para borrar el usuario autenticado
    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token })
    });
    if (res.ok) {
      setSuccess(true);
      setLoading(false);
      supabase.auth.signOut();
      if (onDeleted) onDeleted();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "No se pudo eliminar la cuenta.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        className="px-6 py-2 rounded-full bg-gradient-to-r from-red-400 to-red-700 text-white font-bold shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Eliminando..." : "Eliminar cuenta"}
      </button>
      {error && <span className="text-red-600 text-sm font-semibold">{error}</span>}
      {success && <span className="text-green-600 text-sm font-semibold">Cuenta eliminada correctamente.</span>}
    </div>
  );
}
