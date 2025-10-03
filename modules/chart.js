const progressScoreChart = document.getElementById("progressScoreChart");
const categorieChart = document.getElementById("categorieChart");

// creation de la courbe de progression du score au cours du temps
export function createProgressScoreShart(history) {
  const ctx = progressScoreChart.getContext("2d");

  // Données pour la courbe
  const progressData = history.map((quiz) => ({
    x: quiz.date,
    y: quiz.score,
  }));

  new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Score",
          data: progressData,
          borderColor: "rgb(246, 210, 5)",
          backgroundColor: "rgba(246, 210, 5, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgb(190, 49, 205)",
          pointBorderColor: "white",
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "dd/MM/yyyy HH:mm",
            },
          },
          title: {
            display: true,
            text: "Temps",
            color: "white",
            font: { size: 14 },
          },
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" },
        },
        y: {
          title: {
            display: true,
            text: "Score",
            color: "white",
            font: { size: 14 },
          },
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" },
          min: 0,
          max: 10,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: { size: 14 },
          },
        },
      },
    },
  });
}

// creation de la courbe de repartition des categories
export function createCategorieCharts(history) {
  const ctx = categorieChart.getContext("2d");

  const categorieCount = {};
  history.forEach((quiz) => {
    categorieCount[quiz.categorie] = (categorieCount[quiz.categorie] || 0) + 1;
  });

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categorieCount),
      datasets: [
        {
          data: Object.values(categorieCount),
          backgroundColor: [
            "rgba(246, 210, 5, 0.8)",
            "rgba(190, 49, 205, 0.8)",
            "rgba(51, 0, 170, 0.8)",
          ],
          borderColor: [
            "rgb(246, 210, 5)",
            "rgb(190, 49, 205)",
            "rgb(51, 0, 170)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: { size: 14 },
          },
        },
      },
    },
  });
}
