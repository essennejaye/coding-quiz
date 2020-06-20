var timer = 10;
var score = 0;

var startBtn = document.querySelector("#btn");
var startPageEl = document.getElementById("start-page");
var countDownEl = document.querySelector("#timer");
var quizContentEl = document.getElementById("quiz-content");
var quizquestionEl = document.getElementById("quiz-question");
var quizanswersEl = document.getElementById("quiz-answers")
var resultsContainer = document.getElementById("results");
var initialsEl = document.getElementById("intials");
var submitButton = document.getElementById("submit");
var questions = [
    {
        question: "What does HTML stand for?",
        choices: {a: "Hyper Text Markup Language",
                  b: "Home Tool Markup Language", 
                  c: "Hyperlinks and Text Markup Language"},
        answer: "a"

    },
    {
        question: "How can you open a link in a new tab/browser window?",
        choices: {a: "<a href'url' target='new'>",
                  b: "<a href='url' target='_blank'>",
                  c: "<a href='url' new>"},
        answer: "b"
    }
];
function countDown() {
    var countDownTimer = setInterval(function () {
        countDownEl.textContent = timer;
        timer--;
        if (timer === 0) {
            clearInterval(countDownTimer);
        }
    }, 1000);
    startPageEl.style.visibility = "hidden";
}
function buildQuiz(){
    for (var i=0; i<questions.length; i++){


            
        }
    }

function showResults(){}


    
    

startBtn.addEventListener("click", countDown);