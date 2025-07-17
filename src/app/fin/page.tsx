export default function Fin() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6 max-w-md w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-green-500 drop-shadow-md pop-in mb-2">
          ¡Fin del Juego!
        </h1>
        <p className="text-lg text-gray-700 text-center fade-in">
          ¡Felicidades <span className="font-bold text-green-700">Ejemplo123</span>, eres el ganador!
        </p>
        <button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 mt-2"
          onClick={() => window.location.href = '/'}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
}
