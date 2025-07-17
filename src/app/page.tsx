import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-10 flex flex-col items-center gap-8 max-w-lg w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-yellow-500 drop-shadow-md pop-in">
          Serpientes y Escaleras
        </h1>
        <p className="mb-4 text-lg text-gray-700 text-center fade-in delay-100">
          ¡Bienvenido al juego interactivo! Responde preguntas, avanza en el tablero y reta a tus amigos en la misma computadora.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href="/login"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-400 text-white text-xl font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-green-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Iniciar Sesión
          </a>
          <a
            href="/register"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xl font-semibold shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Registrarse
          </a>
        </div>
      </div>
    </main>
  );
}

