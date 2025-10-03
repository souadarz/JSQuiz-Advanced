
//calcule mellieur scroe
export function bestScore(history){
    const best = history.reduce((max, quiz) => quiz.score > max ? quiz.score : max , 0);
    return best;
}

//calcule nombre total des parties jouées
export function nbrtotalGames(history){
  const nbrGames = history.length;
  return nbrGames;
}

//calcule la moyenne des scores
export function avgScore(history){
    if(!history || history.length == 0) return 0 ;

    const sumScores = history.reduce((sum, quiz) => sum + quiz.score , 0);
    const avgScore = (sumScores / history.length).toFixed(2);
    return avgScore;
}

//calcule score moyen et nombre des parties jouées par categoie
export function avgScoreCategorie(history, categorie){
    const quizCat = history.filter(quiz => quiz.categorie == categorie);
    const nbrGamesCategorie = quizCat.length;
    const sumScores = quizCat.reduce((sum, quiz)=> sum + quiz.score, 0);
    const avgScoreCategorie = (sumScores/nbrGamesCategorie).toFixed(2);

    return {avgScoreCategorie, nbrGamesCategorie};
}

// trouver les 3 top joueurs 
export function topPlayers(history){
    const playerStats = {};
    history.forEach(quiz=> {
        if(!playerStats[quiz.username]){
            playerStats[quiz.username] = {totalScore: 0, games:0};
        }
        playerStats[quiz.username].totalScore += quiz.score;
        playerStats[quiz.username].games += 1;
    });

    const sortedPlayers = Object.entries(playerStats).map(([username, stats]) => ({
        username,
        avgScore: (stats.totalScore / stats.games).toFixed(2),
        games: stats.games
    })).sort((a, b) => b.avgScore - a.avgScore).slice(0, 3);

    return sortedPlayers;
}