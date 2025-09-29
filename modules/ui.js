import { questionsData } from "./main.js";
import { formatTime, validateAnswer } from "./quiz.js";
import { nbrtotalGames, bestScore, avgScore, avgScoreCategorie } from "./stats.js";

const timeGlob = document.getElementById("timeGlob");
const finalResult = document.querySelector("#finalResult");
const scoreFinale = document.getElementById("scoreFinale");
const total = document.getElementById("totalQuestions");
const totalGames = document.getElementById("totalGames");
const meilleurScore = document.getElementById("bestScore");
const moyScore = document.getElementById("avgScore");
const totalTime = document.getElementById("totalTime");
const containerTopPlayers = document.getElementById("topPlayers");
const containerCatStats = document.getElementById("catStats");

export function switchScreen(firstScreen, secondeScreen) {
  firstScreen.classList.remove("active");
  secondeScreen.classList.add("active");
}

//fonction qui cree les éléments d'une reponse (input, label)
export function createAnswerInput(rep, i, questionType) {
  const input = document.createElement("input");
  input.value = rep;
  input.classList.add("ResInput");
  input.id = `answer-${i}`;
  input.setAttribute("data-resIndex", i);
  input.type = questionType == "multiple" ? "checkbox" : "radio";
  const label = document.createElement("label");
  label.textContent = rep;
  label.classList.add("answer");
  label.appendChild(input);

  return { input, label };
}

//gerer la sélection d'une reponse dans le quiz(reponse multiple ou unique)
export function handleAnswerSelection(input, label, nextBtn) {
  if (input.type === "radio") {
    document
      .querySelectorAll(".answer")
      .forEach((label) => label.classList.remove("selected"));
    label.classList.add("selected");
  } else {
    label.classList.toggle("selected");
  }
  nextBtn.disabled = false;
}

//l'affichage des resultas d'un quiz(durée, score, la question avec reponses choisies et reponses correct)
export function showResult(quiz, totalSeconds) {
  timeGlob.textContent = `${formatTime(totalSeconds)} seconds `;
  scoreFinale.textContent = quiz.score;
  total.textContent = questionsData.length;
  finalResult.innerHTML = "";
  quiz.reponses.forEach((reponse, i) => {
    const divResult = document.createElement("div");
    divResult.classList.add("divResult");
    const questionResult = document.createElement("p");
    questionResult.innerHTML = `<span class="questRes">Question ${
      i + 1
    }:</span> ${reponse.quest}`;

    const divReponsesResult = document.createElement("div");
    divReponsesResult.innerHTML = `<strong>Votre réponse :</strong> ${reponse.reponseChosie}`;
    divReponsesResult.id = "divReponsesResultId";

    const repCorretResult = document.createElement("p");
    repCorretResult.innerHTML = `<strong>Bonne réponse :</strong> ${reponse.reponseCorrect}`;

    divResult.appendChild(questionResult);
    divResult.appendChild(divReponsesResult);
    divResult.appendChild(repCorretResult);

    finalResult.appendChild(divResult);
  });
}

//handle cklick sur un element de dom
export function handleClickEvent(element,fct){
  element.addEventListener("click", ()=>{
    fct();
  });
}
 
//affichage du feedback sur les reponses
export function showAnswerFeedback(currentQuestionData, reponsesDiv){
  const { userChoices, isCorrect, correctAnswers, selectedRes } = validateAnswer(
      currentQuestionData,
      reponsesDiv
    );

    selectedRes.forEach((input)=>{
      if(isCorrect){
        const label = input.closest(".ResInput");
        label.style.background = "#22c55e";
      }else if(userChoices.some(choice => !correctAnswers.includes(choice) )){
        selectedRes.style.background = "#ef4444";
      }else if(userChoices.some(choise => correctAnswers.includes(choise))){
        label.style.background = "#22c55e";
      }
    });
}

//affichage des statistiques
export function displayStats(history){
  console.log("inside dislay stats");
  totalGames.textContent = nbrtotalGames(history);
  meilleurScore.textContent = bestScore(history);
  moyScore.textContent = avgScore(history);
}

//affichage des top 3 players
export function displayTopPlayers(topPlayers){
  containerTopPlayers.innerHTML = "";

  topPlayers.forEach((player) => {
    const card = document.createElement('div');
    card.className = 'playerCard';
    const playerName = document.createElement("h3");
    const playerInfo = document.createElement('div');
    playerName.textContent = player.username;
    const playerGames = document.createElement("p");
    playerGames.textContent = `${player.games} partie(s) jouée(s)`;
    const playerScore = document.createElement('div');
    playerScore.className = "playerScore";
    playerScore.textContent = `${player.avgScore}`;

    playerInfo.append(playerName, playerGames)
    card.append(playerInfo, playerScore)
    containerTopPlayers.appendChild(card);
  });
}

// affichage des statistiques par categorie
export function displayCategorieStats(history){
  containerCatStats.innerHTML = "";

  const categories = ['javaScript', 'nodeJs', 'baseDeDonnee'];
  
  categories.forEach((categorie)=> {
    const {avgScoreCategorie: avgScore, nbrGamesCategorie} = avgScoreCategorie(history, categorie);
    const cardCat = document.createElement('div');
    cardCat.className = 'categorieCard';
    cardCat.innerHTML = `
    <div class="catName">${categorie}</div>
    <div class="catStat">
        <span>Parties jouées:</span>
        <span><strong>${nbrGamesCategorie}</strong></span>
    </div>
    <div class="catStat">
        <span>Score moyen:</span>
        <span><strong>${avgScore}</strong></span>
    </div>
    `;
    containerCatStats.appendChild(cardCat);
  });
}