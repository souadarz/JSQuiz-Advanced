import { createAnswerInput, handleAnswerSelection } from "./UI.js";
import { questionsData } from "./main.js";

const question = document.getElementById("question");
const reponsesDiv = document.getElementById("reponses");
const nextBtn = document.getElementById("nextBtn");
const time = document.getElementById("time");
const submitBtn = document.getElementById("submitBtn");
const timeGlobale = document.getElementsByClassName("timeGlobale");

let timerQuestion;
export let timerG;
export let totalSeconds = 0 ;

export const quizState = {
  // currentIndex: 0,
  quizHistory: [],
  score: 0
};

export async function fetchData(categorie) {
  try {
    const res = await fetch(`../data/${categorie}.json`);
    if (!res.ok) throw new Error("Erreur de chargement");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Impossible de charger les questions :", err);
  }
}

//
export function showQuestions(questionData, index) {
  question.textContent = "";
  reponsesDiv.textContent = "";

  const quest = questionData[index];
  currentQuestion.textContent = index + 1;
  question.textContent = quest.question;
  quest.reponses.forEach((rep, i) => {
    const { input, label } = createAnswerInput(rep, i, quest.type);
    input.addEventListener("click", () => {
      handleAnswerSelection(input, label, nextBtn);
    });
    reponsesDiv.appendChild(label);
  });
  stopTimer(timerQuestion);
  timerQuestion = timer(7);
}

//Récupère les réponses utilisateur et vérifie si elles sont correctes
export function validateAnswer(currentQuestionData, responsesContainer) {
  const selectedRes = responsesContainer.querySelectorAll(".ResInput:checked");
  const userChoices = [];
  selectedRes.forEach((input) => {
    userChoices.push(parseInt(input.getAttribute("data-resIndex")));
  });

  const correctAnswers = [...currentQuestionData.reponse_correct].sort(
    (a, b) => a - b
  );
  const sortedUserChoices = [...userChoices].sort((a, b) => a - b);
  const isCorrect =
    correctAnswers.length === sortedUserChoices.length &&
    correctAnswers.every((val, i) => val === sortedUserChoices[i]);

  return { isCorrect, userChoices, correctAnswers };
}

// l'ajoute des réponses de l'utilisateur à l'historique
export function updateQuizHistorique(
  history,
  questionData,
  userChoices,
  correctAnswers
) {
  history[history.length - 1].reponses.push({
    quest: questionData.question,
    reponseChosie: userChoices.length
      ? userChoices.map((i) => questionData.reponses[i])
      : ["No Answer"],
    reponseCorrect: correctAnswers.map((i) => questionData.reponses[i]),
  });
}

// Passe à la question suivante ou termine le quiz
export function handleNextStep(currentIndex, quizHistory = [], score) {

  stopTimer(timerQuestion);
  if (currentIndex < questionsData.length - 1) {
    let newIndex = currentIndex + 1;
    nextBtn.disabled = true;
    showQuestions(questionsData, newIndex);
    return newIndex
  } else {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
    quizHistory[quizHistory.length - 1].score = score;
  }
}

function timer(count) {
  let t = setInterval(function () {
    time.textContent = count;
    count--;
    if (count < 0) {
      stopTimer(t);
      nextBtn.disabled = false;
      nextBtn.click();
    }
  }, 1000);
  return t;
}

export function stopTimer(timer) {
  clearInterval(timer);
}

export function timerGlobale() {
  totalSeconds = 0;
  timerG = setInterval(() => {
    totalSeconds++;
    timeGlobale.textContent = totalSeconds;
  }, 1000);
}

export function feedBack(score, total) {
  if (score === total) {
    return "Excellent ! Vous avez tout juste, bravo";
  } else if (score >= total * 0.7) {
    return "Très bien ! Vous maîtrisez presque tout ";
  } else if (score >= total * 0.4) {
    return "Pas mal, mais vous pouvez encore progresser";
  } else {
    return "Il faut réviser, ne vous découragez pas";
  }
}
