
export function saveQuiz(newQuiz){
    const existeHistorique= JSON.parse(localStorage.getItem("historique")) || [];
    existeHistorique.push(newQuiz);
    localStorage.setItem("historique", JSON.stringify(existeHistorique));
}

export function getQuizHistory(){
    const history = localStorage.getItem("historique");
    return JSON.parse(history);
}

