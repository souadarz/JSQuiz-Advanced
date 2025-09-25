import {
  fetchData,
  showQuestions,
  validateAnswer,
  updateQuizHistorique,
  handleNextStep,
  quizState,
  timerGlobale,
  feedBack,
  timerG,
  stopTimer,
  totalSeconds
} from "./quiz.js";
import { switchScreen, showResult } from "./UI.js";

quizState.score = 0;
quizState.currentIndex = 0;
quizState.quizHistory = [];

const startScreen = document.getElementById("startScreen");
const categories = document.querySelectorAll(".cat");
const categorieScreen = document.getElementById("categorieScreen");
const questionScreen = document.getElementById("questionScreen");
const reponsesDiv = document.getElementById("reponses");
const resultScreen = document.getElementById("resultScreen");
const timeGlobale = document.getElementById("timeGlobale");
const nbrQuestions = document.getElementById("nbrQuestions");
const feedback = document.querySelector("#feedBack");
const recommancerBtn = document.querySelector("#recommancerBtn");

export let questionsData = [];

categories.forEach((cat) => {
  cat.addEventListener("click", async () => {
    switchScreen(categorieScreen, questionScreen);
    timerGlobale();
    const categorie = cat.dataset.categorie;
    const dataCategorie = await fetchData(categorie);
    questionsData = dataCategorie.questions;
    nbrQuestions.textContent = questionsData.length;
    quizState.quizHistory.push({
      //   username: usernameValue,
      categorie: categorie,
      reponses: [],
      date: new Date().toLocaleString(),
      score: quizState.score,
    });
    if (dataCategorie) {
      showQuestions(questionsData, quizState.currentIndex);
    }
  });
});

nextBtn.addEventListener("click", () => {
  console.log(totalSeconds);
  const currentQuestionData = questionsData[quizState.currentIndex];
  const { userChoices, isCorrect, correctAnswers } = validateAnswer(
    currentQuestionData,
    reponsesDiv
  );

  if (isCorrect) quizState.score++;

  updateQuizHistorique(
    quizState.quizHistory,
    currentQuestionData,
    userChoices,
    correctAnswers
  );
  quizState.currentIndex = handleNextStep(
    quizState.currentIndex,
    quizState.quizHistory,
    quizState.score
  );
});

//à revoir la logic de locale storage
submitBtn.addEventListener("click", () => {
  stopTimer(timerG);
  switchScreen(questionScreen, resultScreen);
  // localStorage.setItem("historique", JSON.stringify(quizHistorique));

  let dernierQuiz = quizState.quizHistory[quizState.quizHistory.length - 1];
  quizState.quizHistory.push(dernierQuiz);
  const totalQuest = questionsData.length;
  feedback.innerHTML = feedBack(dernierQuiz.score, totalQuest);
  showResult(dernierQuiz, totalSeconds);
});

recommancerBtn.addEventListener("click", () => {
  switchScreen(resultScreen, startScreen);

  //   usernameInput.value = localStorage.getItem("username");
  quizState.currentIndex = 0;
  quizState.score = 0;
  nextBtn.style.display = "block";
  submitBtn.style.display = "none";
});
