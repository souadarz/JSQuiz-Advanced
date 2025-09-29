import { formatDate } from "./quiz.js";

//export des données en CSV
export function exportToCSV(history) {
  const headers = ["Username", "Catégorie", "Score", "Date"];

  const rows = history.map((quiz) => [
    quiz.username,
    quiz.categorie,
    quiz.score,
    formatDate(quiz.date),
  ]);

//construction du contenu du CSV 
  const csvContent = [headers, ...rows]
    .map((row) => row.map((ele) => `"${ele}"`).join(";"))
    .join("\n");

  //creation du fichier et téléchargement
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "historique_quiz.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//export des données en JSON
export function exportToJson(data, filename ="data.json"){
    const jsonString = JSON.stringify(data);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    //creation d'un lien invisible et déclenche le téléchérgement
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
