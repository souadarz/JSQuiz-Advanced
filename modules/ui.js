
export function switchScreen(firstScreen, secondeScreen) {
    firstScreen.classList.remove("active");
    secondeScreen.classList.add("active");
}

//fonction qui cree les éléments d'une reponse (input, label)
export function createAnswerInput(rep, i, questionType){
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

    return {input, label};
}
