
export function saveQuiz(newQuiz){
    const existeHistorique= JSON.parse(localStorage.getItem("historique")) || [];
    existeHistorique.push(newQuiz);
    localStorage.setItem("historique", JSON.stringify(existeHistorique));
}

export function getQuizHistory(){
    const history = localStorage.getItem("historique");
    return JSON.parse(history);
}

export function saveQuizProgress(state) {
  if (!state.currentUser) return;
  localStorage.setItem(`quizProgress_${state.currentUser}`, JSON.stringify(state));
}

export function getQuizProgress(username) {
  const data = localStorage.getItem(`quizProgress_${username}`);
  return data ? JSON.parse(data) : null;
}

export function clearQuizProgress(username) {
  localStorage.removeItem(`quizProgress_${username}`);
}