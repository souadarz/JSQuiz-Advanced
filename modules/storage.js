
export function saveQuiz(quiz){
    localStorage.setItem("historique", JSON.stringify(quiz))
}

export function getQuizHistory(){
    const history = localStorage.getItem("historique");
    return JSON.parse(history);
}

