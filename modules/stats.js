import { getQuizHistory } from "./storage.js";

export function bestScore(){
    history = getQuizHistory();
    const best = history.reduce((max, quiz) => quiz.score > max ? quiz.score : max , 0);
    return best;
}


