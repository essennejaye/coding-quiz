var score = 0;
var savedScores = [];
var currentQuestionIndex = 0;
var questions = [
    {
        question: "What does HTML stand for?",
        choices: [
            "1. Hyper Text Markup Language",
            "2. Home Tool Markup Language",
            "3. Hyperlinks and Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "How can you open a link in a new tab/browser window?",
        choices: [
            "1. <a href'url' target='new'>",
            "2. <a href='url' target='_blank'>",
            "3. <a href='url' new>",
            "4. <a href='url' target='new window'>"
        ],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        choices: [
            "1. Creative Sheet Styling",
            "2. Complicated Style Stuff",
            "3. Cascading Style Sheets",
            "4. Contemporary Styling Specifications"
        ],
        answer: 2
    },
];
// retreive and display high score if saved otherwise display 0
function retreiveHighScore() {
    var lastHighScore = localStorage.getItem(scoreName);
    var lastHighScoreArray = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        return retreivedHighScore = lastHighScoreArray[0].newScore;
    }
    else return 0;
}
// load start page, set timer  and start quiz 
var startPageEl = document.getElementById("start-page");
var countDownEl = document.querySelector("#timer");
var countDownTimer;
function countDown() {
    var viewHighScoreEl = document.querySelector("#view-high-score");
    viewHighScoreEl.textContent = retreiveHighScore();
    timer = questions.length * 5;
    countDownTimer = setInterval(function () {
        countDownEl.textContent = timer;
        timer--;
        // if time expires before any question is answered, start quiz over
        if (timer === 0) {
            roundOver()
        }
    }, 1000);
    // hide start page and call function to build quiz questions
    startPageEl.classList.add("hidden");
    buildQuiz();
}
var quizQuestionEl = document.getElementById("quiz-question");
var quizAnswersEl = document.getElementById("quiz-answers")
function buildQuiz() {
    var quizQuestion = questions[currentQuestionIndex].question;
    quizQuestionEl.textContent = quizQuestion;
    var quizChoices = questions[currentQuestionIndex].choices;
    for (var i = 0; i < quizChoices.length; i++) {
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
var feedbackEl = document.getElementById("question-feedback");
function feedBackTimeout() {
    feedbackEl.setAttribute("class", "hidden");
}
function choiceClicked(event) {
    var buttonEl = event.target;
    if (buttonEl) {
        var buttonChosen = parseInt(buttonEl.getAttribute("selectedIndex"));
        var answerChoice = questions[currentQuestionIndex].answer;
        if (buttonChosen === answerChoice) {
            feedbackEl.textContent = "CORRECT!";
            score += 5;
        }
        else if (buttonChosen != answerChoice) {
            feedbackEl.textContent = "WRONG!";
            timer -= 10;
            if (timer <= 0) {
                roundOver();
            }
            countDownEl.textContent = timer;
        }
        feedbackEl.removeAttribute("class", "hidden");
        feedbackEl.setAttribute("class", "feedback")
        setTimeout(feedBackTimeout, 500);
    }
    getNextQuestion();
}
function getNextQuestion() {
    if (timer <= 0) {
        roundOver();
        return;
    } else {
        ++currentQuestionIndex;
    }
    if (currentQuestionIndex >= questions.length) {
        roundOver();
    }
    else {
        clearAnswers();
        buildQuiz();
    }
}
function roundOver() {
    timer = 0;
    countDownEl.textContent = "Round Over!";
    clearInterval(countDownTimer);
    clearAnswers();
    endQuiz();
}
function clearAnswers() {
    var count = quizAnswersEl.childElementCount;
    for (var i = 0; i < count; i++) {
        quizAnswersEl.removeChild(quizAnswersEl.childNodes[0]);
    }
}
var quizEndEl = document.getElementById("quiz-end");
var submitButton = document.getElementById("submit-button");
function endQuiz() {
    quizQuestionEl.classList.add("hidden");
    quizEndEl.classList.remove("hidden");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = score;
    submitButton.addEventListener("click", getInitials);
}
const scoreName = "endscore";
var initialsEl = document.getElementById("initials");
function getInitials() {
    if (!initialsEl || initialsEl.value === "") {
        alert("You must enter your initials");
        return;
    } else {
        var lastHighScore = localStorage.getItem(scoreName);
        var lastHighScoreArray = JSON.parse(lastHighScore);
        if (!lastHighScoreArray || score > lastHighScoreArray[0].newScore) {
            var scoreData = {
                name: initialsEl.value,
                newScore: score
            };
            if (!lastHighScoreArray) lastHighScoreArray = [];
            lastHighScoreArray.push(scoreData);
            lastHighScoreArray.sort(function (a, b) { return -(a.newScore - b.newScore) });
            localStorage.setItem(scoreName, JSON.stringify(lastHighScoreArray));
        }
    } showResults();
}
var highResultEl = document.getElementById("show-result");
function showResults() {
    quizEndEl.classList.add("hidden");
    highResultEl.classList.remove("hidden");
    var showHighResultEl = document.querySelector("#show-high-result");
    var lastHighScore = localStorage.getItem(scoreName);
    lastHighScoreArray = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        showHighResultEl.value = "1. " + lastHighScoreArray[0].name + ":" + lastHighScoreArray[0].newScore;
    }
};
function clearLocalStorage() {
    document.querySelector("#show-high-result").value = "";
    localStorage.clear(lastHighScoreArray);
}
function startGameOver() {
    highResultEl.classList.add("hidden");
    startPageEl.classList.remove("hidden")
    initialsEl.value = "";
    currentQuestionIndex = 0;
    score = 0;
}
var startBtn = document.querySelector("#start-button");
var goBackBtn = document.querySelector("#go-back");
var clearResultBtn = document.querySelector("#clear-result");
startBtn.addEventListener("click", countDown);
goBackBtn.addEventListener("click", startGameOver);
clearResultBtn.addEventListener("click", clearLocalStorage);
