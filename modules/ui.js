import { questionsData } from "./main.js";
import { validateAnswer } from "./quiz.js";

const timeGlob = document.getElementById("timeGlob");
const finalResult = document.querySelector("#finalResult");
const scoreFinale = document.getElementById("scoreFinale");
const total = document.getElementById("totalQuestions");

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
  timeGlob.textContent = `${totalSeconds} seconds `;
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