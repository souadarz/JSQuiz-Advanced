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
  totalSeconds,
} from "./quiz.js";
import { saveQuiz } from "./storage.js";
import { switchScreen, showResult, handleClickEvent } from "./UI.js";

quizState.score = 0;
quizState.currentIndex = 0;
quizState.quizHistory = [];
let usernameValue = "";

const startScreen = document.getElementById("startScreen");
const usernameInput = document.getElementById("usernameInput");
const username = document.getElementById("username");
const startQuizBtn = document.getElementById("startQuizBtn");
const cardScreen = document.getElementById("cardScreen");
const categories = document.querySelectorAll(".cat");
const categorieScreen = document.getElementById("categorieScreen");
const questionScreen = document.getElementById("questionScreen");
const reponsesDiv = document.getElementById("reponses");
const resultScreen = document.getElementById("resultScreen");
const nbrQuestions = document.getElementById("nbrQuestions");
const feedback = document.querySelector("#feedBack");
const recommancerBtn = document.querySelector("#recommancerBtn");
const cardNewQuiz = document.getElementById("cardNewQuiz");


export let questionsData = [];

startQuizBtn.addEventListener("click", () => {
  usernameValue = usernameInput.value.trim();
  if (usernameValue === "") {
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";
    switchScreen(startScreen,cardScreen);
  }
});

handleClickEvent(cardNewQuiz, ()=>switchScreen(cardScreen,categorieScreen));

categories.forEach((cat) => {
  cat.addEventListener("click", async () => {
    switchScreen(categorieScreen, questionScreen);
    timerGlobale();
    username.textContent = usernameValue;
    const categorie = cat.dataset.categorie;
    const dataCategorie = await fetchData(categorie);
    questionsData = dataCategorie.questions;
    nbrQuestions.textContent = questionsData.length;
    quizState.quizHistory.push({
      username: usernameValue,
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
  saveQuiz(quizState.quizHistory);
  let dernierQuiz = quizState.quizHistory[quizState.quizHistory.length - 1];
  quizState.quizHistory.push(dernierQuiz);
  const totalQuest = questionsData.length;
  feedback.innerHTML = feedBack(dernierQuiz.score, totalQuest);
  showResult(dernierQuiz, totalSeconds);
});

recommancerBtn.addEventListener("click", () => {
  switchScreen(resultScreen, startScreen);
  quizState.currentIndex = 0;
  quizState.score = 0;
  nextBtn.style.display = "block";
  submitBtn.style.display = "none";
});
