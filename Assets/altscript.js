// scrpt suggestion from class, left here for reference


var startButtonEl = document.querySelector("#start-btn");
var currentQuestionIndex = 0;

// Functons
function createQuestion() {
if (currentQuestionIndex < questions.length){
    // clg(questions[currentquestionsindex].questions)

    // create a question element
    // append / replace with last questions

}


}


function handleClick() {
    console.log("clicked");
    createQuestion()
}

function main () {
    // add start clck event listener
    startButtonEl.addEventListener('click', handleClick);
}

// Start
main();