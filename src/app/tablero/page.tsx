"use client";
import React, { useState } from "react";
import { questions, Question } from "./questions";
import Dice from "./Dice";

// Serpientes y escaleras: casilla origen -> destino
const snakes: Record<number, number> = { 16: 6, 33: 13, 38: 20 };
const ladders: Record<number, number> = { 3: 22, 11: 28, 21: 32 };
const allColors = ["bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-red-500"];
const allNames = ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4"];

export default function Tablero() {
  const rows = 8;
  const cols = 5;
  const total = 40;
  // Puntos de cada casilla (aleatorio entre 10 y 50, fijo para toda la partida)
  const [cellPoints] = useState(() => [0, ...Array.from({ length: total }, () => 10 * (1 + Math.floor(Math.random() * 5)))]);
  const cells = Array.from({ length: total }, (_, i) => total - i);

  // Selección dinámica de jugadores
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const playerColors = allColors.slice(0, numPlayers ?? 2);
  const playerNames = allNames.slice(0, numPlayers ?? 2);
  // Estados dependientes del número de jugadores
  const [positions, setPositions] = useState<number[]>(() => Array(numPlayers ?? 2).fill(0));
  const [scores, setScores] = useState<number[]>(() => Array(numPlayers ?? 2).fill(0));
  const [turn, setTurn] = useState(0); // 0: Jugador 1, 1: Jugador 2, ...

  // Reinicia posiciones, scores y turno cuando cambia el número de jugadores
  React.useEffect(() => {
    if (numPlayers !== null) {
      setPositions(Array(numPlayers).fill(0));
      setScores(Array(numPlayers).fill(0));
      setTurn(0);
    }
  }, [numPlayers]);
  const [dice, setDice] = useState<number>(1);
  const [rolling, setRolling] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [pendingMove, setPendingMove] = useState<{player: number, from: number, to: number, type: 'snake'|'ladder'}|null>(null);
  const [winner, setWinner] = useState<number|null>(null);
  const [msg, setMsg] = useState("");

  // Si aún no se ha seleccionado el número de jugadores, mostrar selección
  if (numPlayers === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 border border-green-200">
          <h1 className="text-3xl font-bold text-green-700 mb-2">¿Cuántos jugadores van a participar?</h1>
          <div className="flex gap-6">
            {[2,3,4].map(n => (
              <button
                key={n}
                className="px-8 py-4 rounded-xl text-2xl font-extrabold bg-gradient-to-br from-blue-400 to-green-300 text-white shadow-lg hover:scale-110 transition-all"
                onClick={() => {
                  setNumPlayers(n);
                  setPositions(Array(n).fill(0));
                  setScores(Array(n).fill(0));
                }}
              >
                {n} jugadores
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Lanza el dado y mueve
  const rollDice = () => {
    if (rolling || winner) return;
    setRolling(true);
    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1;
      setDice(value); // Usar función para asegurar actualización
      movePlayer(value);
      setRolling(false);
    }, 700);
  };

  // Lógica de movimiento y preguntas
  const movePlayer = (steps: number) => {
    const p = turn;
    let current = positions[p];
    let next = current + steps;
    // Si el jugador está fuera (posición 0), solo puede entrar si el dado lo lleva a 1 o más
    if (current === 0) {
      if (steps < 1) {
        finishMove(p, 0); // No entra
        return;
      }
      next = steps; // Entra directo a la casilla igual al dado
    }
    if (next > total) next = current;
    if (next < 1) next = 0;
    let type: 'snake'|'ladder'|null = null;
    let dest = next;
    // Solo pregunta si cae en cabeza de serpiente o base de escalera
    if (snakes[next]) {
      type = 'snake';
      dest = snakes[next];
      setPendingMove({ player: p, from: next, to: dest, type });
      setQuestion(questions[Math.floor(Math.random() * questions.length)]);
      setShowQuestion(true);
      return;
    } else if (ladders[next]) {
      type = 'ladder';
      dest = ladders[next];
      setPendingMove({ player: p, from: next, to: dest, type });
      setQuestion(questions[Math.floor(Math.random() * questions.length)]);
      setShowQuestion(true);
      return;
    }
    // En cualquier otra casilla, solo avanza
    finishMove(p, next);
  };


  // Al responder pregunta
  const answerQuestion = (correct: boolean) => {
    if (!pendingMove) return;
    if (correct) {
      finishMove(pendingMove.player, pendingMove.to);
      setMsg(pendingMove.type === 'snake' ? '¡Te salvaste de la serpiente!' : '¡Subiste la escalera!');
    } else {
      if (pendingMove.type === 'snake') {
        finishMove(pendingMove.player, pendingMove.from - (pendingMove.from - pendingMove.to));
        setMsg('¡Respuesta incorrecta! Bajaste por la serpiente.');
      } else {
        finishMove(pendingMove.player, pendingMove.from);
        setMsg('¡Respuesta incorrecta! No subiste la escalera.');
      }
    }
    setShowQuestion(false);
    setPendingMove(null);
    setTimeout(() => setMsg(""), 2000);
  };

  // Finaliza movimiento y cambia turno
  const finishMove = (player: number, pos: number) => {
    const newPos = [...positions];
    newPos[player] = pos;
    setPositions(newPos);
    // Sumar puntos de la casilla
    const newScores = [...scores];
    newScores[player] += cellPoints[pos];
    setScores(newScores);
    if (pos === total) {
      setWinner(player);
    } else {
      setTurn((t) => (t + 1) % (numPlayers ?? 2));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 fade-in p-4">
      <div className="bg-white/80 shadow-2xl rounded-3xl p-6 flex flex-col items-center gap-6 max-w-3xl w-full border border-green-100 backdrop-blur-md slide-up">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-yellow-500 drop-shadow-md pop-in mb-2">
            Serpientes y Escaleras
        </h1>
        {/* Ranking dinámico */}
        <div className="flex flex-row gap-8 mb-4 w-full justify-center">
          {positions
            .map((pos, idx) => ({ pos, idx }))
            .sort((a, b) => b.pos - a.pos)
            .map(({ pos, idx }, rank) => (
              <div key={idx} className={`flex flex-col items-center ${rank === 0 && positions[0] !== positions[1] ? 'scale-110' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md ${playerColors[idx]} ${turn===idx && !winner ? 'ring-4 ring-blue-400 scale-110' : ''} transition-all duration-300`} />
                <span className={`text-sm font-semibold ${turn===idx && !winner ? 'text-blue-700' : 'text-gray-600'}`}>{playerNames[idx]}</span>
                <span className={`text-xs mt-1 ${rank === 0 && positions[0] !== positions[1] ? 'font-bold text-green-600' : 'text-gray-500'}`}>{rank === 0 && positions[0] !== positions[1] ? 'Líder' : `#${rank+1}`}</span>
                <span className="text-xs text-gray-400">Casilla: {pos}</span>
                <span className="text-xs font-bold text-yellow-700">Puntos: {scores[idx]}</span>
              </div>
            ))}
        </div>
        <div className="relative w-full max-w-2xl mx-auto">
          {/* SVG de conexiones serpientes/escaleras */}
          <svg className="absolute left-0 top-0 pointer-events-none z-10" width="100%" height="100%" viewBox={`0 0 ${cols*100} ${rows*100}`} style={{width: '100%', height: '100%'}}>
            {/* Serpientes */}
            {Object.entries(snakes).map(([from, to], i) => {
                // from: cabeza de serpiente (donde aparece la pregunta)
                // to: cola de serpiente (destino)
                const fromIdx = cells.indexOf(Number(from));
                const toIdx = cells.indexOf(Number(to));
                if (fromIdx === -1 || toIdx === -1) return null;
                const fx = (fromIdx % cols) * 100 + 50;
                const fy = Math.floor(fromIdx / cols) * 100 + 50;
                const tx = (toIdx % cols) * 100 + 50;
                const ty = Math.floor(toIdx / cols) * 100 + 50;
                return (
                  <path key={i} d={`M${fx},${fy} Q${fx+((tx-fx)/2)},${fy+((ty-fy)/2)-60} ${tx},${ty}`} stroke="#dc2626" strokeWidth="6" fill="none" markerEnd="url(#snakeHead)" opacity="0.7"/>
                );
              })}
              {/* Escaleras */}
              {Object.entries(ladders).map(([from, to], i) => {
                // from: base de escalera (donde aparece la pregunta)
                // to: cima de escalera (destino)
                const fromIdx = cells.indexOf(Number(from));
                const toIdx = cells.indexOf(Number(to));
                if (fromIdx === -1 || toIdx === -1) return null;
                const fx = (fromIdx % cols) * 100 + 50;
                const fy = Math.floor(fromIdx / cols) * 100 + 50;
                const tx = (toIdx % cols) * 100 + 50;
                const ty = Math.floor(toIdx / cols) * 100 + 50;
                return (
                  <path key={i} d={`M${fx},${fy} Q${fx+((tx-fx)/2)},${fy+((ty-fy)/2)+60} ${tx},${ty}`} stroke="#16a34a" strokeWidth="6" fill="none" markerEnd="url(#ladderHead)" opacity="0.7"/>
                );
              })}
            <defs>
              <marker id="snakeHead" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto" markerUnits="strokeWidth">
                <circle cx="6" cy="6" r="5" fill="#dc2626"/>
              </marker>
              <marker id="ladderHead" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto" markerUnits="strokeWidth">
                <rect x="2" y="2" width="8" height="8" fill="#16a34a"/>
              </marker>
            </defs>
          </svg>
          <div className="grid grid-cols-5 grid-rows-8 gap-1">
            {cells.map((num, idx) => (
              <div
                key={num}
                className={`relative flex items-center justify-center h-16 sm:h-20 w-full rounded-xl border-2 font-bold text-lg sm:text-xl transition-all duration-300
                  ${((Math.floor(idx / cols) % 2 === 0) ? (idx % 2 === 0) : (idx % 2 !== 0)) ? 'bg-green-200/80 border-green-400' : 'bg-yellow-100/80 border-yellow-300'}
                  hover:scale-105 hover:shadow-xl`}
              >
                <span className="absolute top-1 left-2 text-xs font-mono text-gray-500">{num}</span>
                <span className="absolute bottom-1 left-2 text-[10px] font-mono text-yellow-700">{cellPoints[num]} pts</span>
                {/* Fichas de jugadores */}
                <div className="absolute bottom-2 right-2 flex flex-row gap-1">
                  {positions.map((pos, pIdx) => pos === num && (
                    <span
                      key={pIdx}
                      className={`w-6 h-6 rounded-full border-2 border-white ${playerColors[pIdx]} shadow-md transition-all duration-300`}
                      title={playerNames[pIdx]}
                    />
                  ))}
                </div>
                {/* Serpientes y escaleras visuales */}


              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-6">
          {!winner && (
            <>
              <div className="flex flex-col items-center gap-2 mb-2">
                <Dice value={dice} rolling={rolling} />
                {dice && !rolling && (
                  <div className="text-lg text-yellow-800 font-semibold mt-2 fade-in">
                    Avanzas {dice} casilla{dice > 1 ? 's' : ''}
                  </div>
                )}
                <button
                  className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-400 text-white text-xl font-semibold shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
                  onClick={rollDice}
                  disabled={rolling || showQuestion}
                >
                  {rolling ? "Lanzando..." : `Lanzar dado (${playerNames[turn]})`}
                </button>
              </div>
              {msg && <span className="text-blue-600 font-semibold fade-in">{msg}</span>}
            </>
          )}
          {winner !== null && (
            <div className="flex flex-col items-center mt-4">
              <span className="text-2xl font-bold text-green-700 fade-in">¡{playerNames[winner]} ganó!</span>
              <a
                href="/fin"
                className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-500 transition-all duration-300"
              >
                Ver resumen
              </a>
            </div>
          )}
        </div>
      </div>
      {/* Modal de pregunta */}
      {showQuestion && question && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center gap-4 slide-up">
            <h2 className="text-xl font-bold text-green-700 mb-2">¡Responde para avanzar!</h2>
            <span className="mb-2 text-gray-800 text-center">{question.question}</span>
            <div className="flex flex-col gap-2 w-full">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(i === question.answer)}
                  className="w-full px-4 py-2 rounded-lg border border-green-200 bg-green-100 hover:bg-green-200 text-green-800 font-semibold transition-all duration-200"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
