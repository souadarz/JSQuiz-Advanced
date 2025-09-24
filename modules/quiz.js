import { createAnswerInput } from "./UI";

const question = document.getElementById("question");
const reponses = document.getElementById("reponses");

export async function fetchData(categorie) {
  try {
    const res = await fetch(`../data/${categorie}.json`);
    if (!res.ok) throw new Error("Erreur de chargement");

    const data = await res.json();
    // console.log('Données :', data);
    return data;
  } catch (err) {
    console.error("Impossible de charger les questions :", err);
  }
}

export function showQuestions(questionData,index){
    question.innerHTML = "";
    reponses.innerHTML = "";

    const quest = questionData[index];
    // 2 ligne à revoire
    currentQuestion.textContent = index + 1;
    question.textContent = quest.question;
    quest.reponses.forEach((rep, i) => {
        const answerElement = createAnswerInput(rep, i, quest.type)
        reponses.appendChild(answerElement);

    //il reste l'event sur linput
    });
}