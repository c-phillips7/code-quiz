window.onload = () => {
// References to HTML locations
var headerEl = document.getElementById("top");
var contentId = document.getElementById("content");



// Creates base element with attribute and text
function createElement(element, type, value, text) {
    var temp = document.createElement(element);
    temp.setAttribute(type, value);
    temp.textContent = text;
    return temp
};

// general funciton for creating buttons
function createButton(idValue) {
    var temp = document.createElement("button");
    temp.setAttribute("type", "button");
    temp.setAttribute("class", "answers");
    temp.setAttribute("id", idValue);
    return temp;
};

function createSpan(idValue) {
    var temp = document.createElement("span");
    temp.setAttribute("data-answer", "option" + idValue);
    temp.setAttribute("id", "option" + idValue);
    return temp;
};

// function to append child elements to content
function appendChild(location, element) {
    var temp = location.appendChild(element);
    return temp;
};


// HTML elements
    // h1 for quiz name
    var questionH1 = createElement("h1", "id", "h1", "Coding Quiz" );
    appendChild(contentId, questionH1);

    // Quiz desciption
    var desciptionDiv = createElement("p", "id", "description", "Answer all the questions within the time limit. Careful! The timer will go down by 10 seconds for every wrong answer.");
    appendChild(contentId, desciptionDiv);

    // Button to start quiz
    var startButton = createElement("button", "id", "start-quiz", "Start Quiz");
    startButton.setAttribute("type", "button");
    appendChild(contentId, startButton)

    // Answer buttons
    var button0 = createButton("btn0");
    var button1 = createButton("btn1");
    var button2 = createButton("btn2");
    var button3 = createButton("btn3");

    // Click event for quiz start
    document.getElementById("start-quiz").addEventListener("click", startQuiz);

    // Timer display
    var countDown = 0;
    var timerDiv = createElement("div", "id", "timer", "Timer: ");
    timerDiv.setAttribute("class", "top-position");
    appendChild(headerEl, timerDiv);
    var countDownSpan = createElement("span", "id", "countdown", countDown);
    console.log(headerEl.childNodes[0]);
    headerEl.childNodes[0].appendChild(countDownSpan);


function startQuiz(event) {
    event.preventDefault;

// Empty array for questions to push into
    questionList = [];

    var question_0 = {
        text: "Why do JavaScript and Java have similar names?",
        options: ["JavaScript is a stripped-down version of Java", "JavaScript's syntax is loosely based on Java's", "They both originated on the island of Java", "None of the above"],
        correctAnswer: "option1"
    };
    questionList.push(question_0)

    var question_1 = {
        text: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        options: ["The User's machine running a Web browser", "The Web server", "A central machine deep within Netscape's corporate offices", "None of the above"],
        correctAnswer: "option0"
    };
    questionList.push(question_1)

    var question_2 = {
        text: "Which of the following is not a valid JavaScript variable name?",
        options: ["2names", "_first_and_last_names", "FirstAndLast", "None of the above"],
        correctAnswer: "option0"
    };
    questionList.push(question_2)

    var question_3 = {
        text: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<script>", "<javascript"],
        correctAnswer: "option2"
    };
    questionList.push(question_3)

    var question_4 = {
        text: "Which is the correct way to write a JavaScript array?",
        options: ["var txt = new Array(1:\"tim\",2:\"kim\",3:\"jim\")", "var txt = new Array:1=(\"tim\")2=(\"kim\")3=(\"jim\")", "var txt = new Array=\"tim\",\"kim\",\"jim\"", "var txt = new Array(\"tim\",\"kim\",\"jim\")"],
        correctAnswer: "option3"
    };
    questionList.push(question_4)

    var question_5 = {
        text: "Which of the following best describes JavaScript?",
        options: ["A low-level programming language", "A scripting language precompiled in the browser", "an object-oriented scripting language", "a compiled scripting language"],
        correctAnswer: "option2"
    };
    questionList.push(question_5)

    var question_6 = {
        text: "What is mean by \"this\" keyword in javascript?",
        options: ["It refers current object", " It referes previous object", "It is variable which contains value", "None of the above"],
        correctAnswer: "option0"
    };
    questionList.push(question_6)

// variables for Quiz
var lastQuestionIndex = questionList.length - 1;
var score = 0;
var currentQuestionIndex = 0;
countDown = 60;
countDownSpan.textContent = countDown;


    // Hide description and quiz button
    document.querySelector("#description").style.display = "none";
    document.querySelector("#start-quiz").style.display = "none";

    // Run countdown
    setTime();

    // Create answer buttons
    createAnswer();

    // Sets first question, then currentIndexQuestion pulls up later questions
    insertQuestion();

    // Set timer that goes to gameOver() at or below 0
    function setTime() {
        var timerInterval = setInterval(function () {
            countDown--;
            countDownSpan.textContent = countDown;
            if (countDown === 0) {
                clearInterval(timerInterval);
                gameOver();
            }
            else if (countDown < 0) {
                clearInterval(timerInterval);
                gameOver();
                countDown = 0;
            }
            else if (currentQuestionIndex === lastQuestionIndex) {
                clearInterval(timerInterval);
            }
        }, 1000);
    };

    // Target answer buttins for user input to checkAnswer()
    var answerList = document.querySelectorAll(".answers");
    for (var i = 0; i < answerList.length; i++) {
        answerList[i].addEventListener('click', checkAnswer)
    }

    // Creating answer buttons
    function createAnswer() {
        var qIndex = questionList[currentQuestionIndex];
        var answers = createElement("div", "id", "answers");
        appendChild(contentId, answers);
        var answerDiv = document.getElementById("answers");
        appendChild(answerDiv, button0);
        appendChild(answerDiv, button1);
        appendChild(answerDiv, button2);
        appendChild(answerDiv, button3);
        for (var i = 0; i < qIndex.options.length; i++) {
            var textSpan = createSpan(i);
            appendChild(document.getElementById("btn" + i), textSpan)
        };
    };

    // shuffle


    // Function to insert questions, cycling through
    function insertQuestion() {
        var qIndex = questionList[currentQuestionIndex];
        questionH1.textContent = qIndex.text;

        for (var i = 0; i < qIndex.options.length; i++) {
            document.getElementById("option" + i).textContent = qIndex.options[i];
        }
    };

    function checkAnswer(event) {

        

        event.preventDefault();
        var wrongAnswer = 10;
        var qIndex = questionList[currentQuestionIndex];
        // console.log(this);
        // console.log($(this).children("span").attr("data-answer"));
        var userInput = $(this).children("span").attr("data-answer");
        console.log(userInput);
        if (userInput === qIndex.correctAnswer) {
            score++;
            displayCorrect();
        }
        else {
            countDown =  countDown - wrongAnswer;
            countDown.textContent = countDown;
            displayWrong();
        };
        if (currentQuestionIndex < lastQuestionIndex) {
            currentQuestionIndex++;
            insertQuestion();
        }
        else {
            gameOver();
        };
    };

    function displayCorrect() {
        var correct = createElement("h3", "id", "correct", "Correct!");
        appendChild(document.body, correct);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("correct");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    function displayWrong() {
        var wrong = createElement("h3", "id", "wrong", "Wrong!")
        appendChild(document.body, wrong);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("wrong");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    function gameOver() {
        countDownSpan.textContent = 0;
        contentId.style.textAlign = "center";
        questionH1.textContent = "Game Over"
        hideButtons();
        showScore();
        // addInitials();
    };

    // removes answer buttons on gameover screen
    function hideButtons() {
        var qIndex = questionList[currentQuestionIndex];
        for (var i = 0; i < qIndex.options.length; i++) {
            document.getElementById("btn" + i).style.display = "none";
        };
    };

    // displays Score
    function showScore() {
        var scoreDiv = createElement("h2", "class", "score", "Score: " + score);
        appendChild(contentId, scoreDiv);
    };

    // Add intials and High Score

    

}

}