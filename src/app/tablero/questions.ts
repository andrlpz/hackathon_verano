// Preguntas de ejemplo para el juego
export type Question = {
  question: string;
  options: string[];
  answer: number; // índice de la respuesta correcta
};

export const questions: Question[] = [
  {
    question: "¿Cuál es la capital de México?",
    options: ["Guadalajara", "Monterrey", "Ciudad de México", "Puebla"],
    answer: 2,
  },
  {
    question: "¿Cuánto es 7 x 8?",
    options: ["54", "56", "64", "58"],
    answer: 1,
  },
  {
    question: "¿Quién pintó la Mona Lisa?",
    options: ["Picasso", "Leonardo da Vinci", "Van Gogh", "Rembrandt"],
    answer: 1,
  },
  {
    question: "¿En qué continente está Egipto?",
    options: ["Asia", "África", "Europa", "América"],
    answer: 1,
  },
  {
    question: "¿Cuál es el elemento químico H?",
    options: ["Helio", "Hidrógeno", "Hierro", "Hafnio"],
    answer: 1,
  },
  // Puedes agregar más preguntas aquí
];
