var timer = 10;
var score = 0;
var currentQuestionIndex = 0;
var startBtn = document.querySelector("#btn");
var startPageEl = document.getElementById("start-page");
var countDownEl = document.querySelector("#timer");
var quizContentEl = document.getElementById("quiz-content");
var quizQuestionEl = document.getElementById("quiz-question");
var quizAnswersEl = document.getElementById("quiz-answers")
var resultsContainer = document.getElementById("results");
var initialsEl = document.getElementById("intials");
var submitButton = document.getElementById("submit");
var questions = [
    {
        question: "What does HTML stand for?",
        choices: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        answer: 0

    },
    {
        question: "How can you open a link in a new tab/browser window?",
        choices: [
            "<a href'url' target='new'>",
            "<a href='url' target='_blank'>",
            "<a href='url' new>",
            "<a href='url' target='new window'>"
        ],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        choices: [
            "Creative Sheet Styling",
            "Complicated Style Stuff",
            "Cascading Style Sheets",
            "Contemporary Styling Specifications"
        ],
        answer: 2

    },
];
function countDown() {
    var countDownTimer = setInterval(function () {
        countDownEl.textContent = timer;
        timer--;
        if (timer === 0) {
            clearInterval(countDownTimer);
        }
    }, 1000);
    startPageEl.classList.add("hidden");
    buildQuiz();
}

function buildQuiz() {
    var quizQuestion = questions[currentQuestionIndex].question;
    quizQuestionEl.textContent = quizQuestion;
    var quizChoices = questions[currentQuestionIndex].choices;
    for (var i = 0; i< quizChoices.length; i++) {
        var quizChoice = quizChoices[i];
        var listItemEl = document.createElement("li");
        listItemEl.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;
        selectButton.setAttribute("selectedIndex", i);
        selectButton.addEventListener("click", choiceClicked);
        listItemEl.appendChild(selectButton);
        quizAnswersEl.appendChild(listItemEl);
    }

}
function choiceClicked(event){
    var buttonEl = event.target;
    if ( buttonEl) {
        var buttonChosen = parseInt(buttonEl.getAttribute("selectedIndex"));
        var answerChoice = questions[currentQuestionIndex].answer;
        if (buttonChosen === answerChoice) {
            score += 5;
            ++currentQuestionIndex;
            clearAnswers();
            buildQuiz();
        }
        else {

        }
    }
}
function clearAnswers(){
    var count = quizAnswersEl.childElementCount;
    for (var i=0; i<count; i++){
        quizAnswersEl.removeChild(quizAnswersEl.childNodes[0]);
    }
}
// function showResults(){};





startBtn.addEventListener("click", countDown);