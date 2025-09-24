import { fetchData } from "./quiz.js";
import { switchScreen } from "./UI.js";

const categories = document.querySelectorAll(".cat");
const categorieScreen = document.getElementById("categorieScreen");
const questionScreen = document.getElementById("questionScreen");
let currentIndex = 0;

categories.forEach((cat) => {
    cat.addEventListener("click", async () =>{
        switchScreen(categorieScreen, questionScreen);
        const categorie = cat.dataset.categorie;
        const dataCategorie = await fetchData(categorie);
        let questionsData = dataCategorie.questions;
        if(dataCategorie){
            showQuestions(questionsData, currentIndex);
        }
    });
});

