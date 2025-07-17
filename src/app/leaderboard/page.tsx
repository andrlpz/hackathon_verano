export default function Leaderboard() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6 max-w-lg w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-green-500 drop-shadow-md pop-in mb-2">
          Leaderboard
        </h1>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-left text-gray-700 font-semibold">#</th>
              <th className="text-left text-gray-700 font-semibold">Jugador</th>
              <th className="text-left text-gray-700 font-semibold">Puntos</th>
              <th className="text-left text-gray-700 font-semibold">Partidas</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-yellow-100/80">
              <td className="px-3 py-1 rounded-l-lg font-bold">1</td>
              <td className="px-3 py-1">Ejemplo123</td>
              <td className="px-3 py-1 font-bold text-green-600">120</td>
              <td className="px-3 py-1">13</td>
            </tr>
            <tr className="bg-green-100/80">
              <td className="px-3 py-1 rounded-l-lg font-bold">2</td>
              <td className="px-3 py-1">AnaGamer</td>
              <td className="px-3 py-1 font-bold text-blue-600">110</td>
              <td className="px-3 py-1">12</td>
            </tr>
            <tr className="bg-blue-100/80">
              <td className="px-3 py-1 rounded-l-lg font-bold">3</td>
              <td className="px-3 py-1">Luisito</td>
              <td className="px-3 py-1 font-bold text-yellow-600">90</td>
              <td className="px-3 py-1">10</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-600 mt-4 fade-in">¡Compite por el primer lugar!</p>
      </div>
    </main>
  );
}
