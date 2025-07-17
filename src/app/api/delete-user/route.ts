import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { access_token } = await req.json();
  if (!access_token) {
    return NextResponse.json({ error: "No token" }, { status: 400 });
  }

  // Llama a la API de Supabase para borrar el usuario actual
  // Debes tener configurada la variable SUPABASE_SERVICE_ROLE_KEY en tu entorno
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json({ error: "No service role key or url" }, { status: 500 });
  }

  // Obtiene el id del usuario desde el token
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      apikey: serviceRoleKey,
    },
  });
  if (!userRes.ok) {
    return NextResponse.json({ error: "No se pudo obtener el usuario" }, { status: 400 });
  }
  const user = await userRes.json();
  const userId = user.id;
  if (!userId) {
    return NextResponse.json({ error: "No se encontró el usuario" }, { status: 400 });
  }

  // Elimina el usuario usando el service role
  const delRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
    },
  });
  if (delRes.ok) {
    return NextResponse.json({ success: true });
  } else {
    const data = await delRes.json().catch(() => ({}));
    return NextResponse.json({ error: data.message || "No se pudo eliminar el usuario" }, { status: 400 });
  }
}
