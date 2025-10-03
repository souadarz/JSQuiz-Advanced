import { exportToCSV, exportToJson } from "./export.js";
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
  displayDashboard,
  displayHistoryTable,
} from "./quiz.js";
import {
  getQuizHistory,
  saveQuiz,
  getQuizProgress,
  clearQuizProgress,
} from "./storage.js";
import { switchScreen, showResult, handleClickEvent } from "./ui.js";

let usernameValue = "";
export let questionsData = [];

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
const displayDashboardBtn = document.getElementById("displayDashboardBtn");
const cardDashboard = document.getElementById("cardDashboard");
const dashboardScreen = document.getElementById("dashboardScreen");
const statsTableScreen = document.getElementById("statsTableScreen");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const statsTableBtn = document.getElementById("statsTableBtn");
const exportJsonBtn = document.getElementById("exportJsonBtn");
const ReprendreBtn = document.getElementById("cardReprendre");
const nextBtn = document.getElementById("nextBtn");

startQuizBtn.addEventListener("click", () => {
  usernameValue = usernameInput.value.trim();
  if (usernameValue === "") {
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";
    quizState.currentUser = usernameValue;
    switchScreen(startScreen, cardScreen);
  }
});

handleClickEvent(cardNewQuiz, () => switchScreen(cardScreen, categorieScreen));

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
      date: new Date().toISOString(),
      score: quizState.score,
      currentIndex: quizState.currentIndex,
      interrompu: true,
    });
    if (dataCategorie) {
      showQuestions(questionsData, quizState.currentIndex);
    }
  });
});

nextBtn.addEventListener("click", () => {
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
    quizState.score,
    questionsData
  );
});

submitBtn.addEventListener("click", () => {
  stopTimer(timerG);
  switchScreen(questionScreen, resultScreen);
  let dernierQuiz = quizState.quizHistory[quizState.quizHistory.length - 1];
  quizState.interrompu = false;
  dernierQuiz.interrompu = false;
  saveQuiz(dernierQuiz);

  clearQuizProgress(quizState.currentUser);
  const totalQuest = questionsData.length;
  feedback.innerHTML = feedBack(dernierQuiz.score, totalQuest);
  showResult(dernierQuiz, totalSeconds, questionsData);
});

recommancerBtn.addEventListener("click", () => {
  switchScreen(statsTableScreen, cardScreen);
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.interrompu = true;
});

handleClickEvent(displayDashboardBtn, () => {
  switchScreen(resultScreen, dashboardScreen);
  displayDashboard(history);
});

handleClickEvent(cardDashboard, () => {
  switchScreen(cardScreen, dashboardScreen);
  displayDashboard(history);
});

handleClickEvent(statsTableBtn, () => {
  const history = getQuizHistory();
  switchScreen(dashboardScreen, statsTableScreen);
  displayHistoryTable(history);
});

handleClickEvent(exportCsvBtn, () => {
  const history = getQuizHistory();
  exportToCSV(history);
});

handleClickEvent(exportJsonBtn, () => {
  const history = getQuizHistory();
  exportToJson(history);
});

handleClickEvent(ReprendreBtn, () => {
  reprendQuiz(questionsData);
});

async function reprendQuiz() {
  const savedProgress = getQuizProgress(quizState.currentUser);

  if (savedProgress && savedProgress.interrompu) {
    Object.assign(quizState, savedProgress);

    const lastQuiz = quizState.quizHistory[quizState.quizHistory.length - 1];
    const categorie = lastQuiz.categorie;

    let dataCategoie = await fetchData(categorie);
    questionsData = dataCategoie.questions;
    switchScreen(cardScreen, questionScreen);

    showQuestions(questionsData, quizState.currentIndex);

    timerGlobale();
  } else {
    alert(
      "Aucun quiz interrompu trouvé, vous pouvez commencer une nouvelle partie"
    );
  }
}
