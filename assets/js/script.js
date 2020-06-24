var score = 0;
var savedScores = [];
// object array for quiz questions, multiple choices for answers, and actual answer
var questions = [{
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
{
    question: "Which of the following is the correct syntax to display “UofA Bootcamp” in an alert box using JavaScript?",
    choices: [
        "1. alertbox(\“UofA Bootcamp\”)",
        "2. msg(\“UofA Bootcamp\”)",
        "3. msgbox(\“UofA Bootcamp\”)",
        "4. alert(\“UofA Bootcamp\”)"
    ],
    answer: 3
},
{
    question: "How do you create a function in Javascript?",
    choices: [
        "1. function myFunction()",
        "2. function = myFunction()",
        "3. myFunction = function()",
        "4. function myFunction{}"
    ],
    answer: 0
},
];
// load start page, set timer  and start quiz 
var startPageEl = document.getElementById("start-page");
var countDownEl = document.querySelector("#timer");
var countDownTimer;

function countDown() {
    var viewHighScoreEl = document.querySelector("#view-high-score");
    viewHighScoreEl.textContent = retreiveHighScore();
    timer = questions.length * 15;
    countDownTimer = setInterval(function () {
        countDownEl.textContent = timer;
        timer--;
        // if time expires before any question is answered, quiz over
        if (timer === 0) {
            roundOver()
        }
    }, 1000);
    // hide start page and call function to build quiz questions
    startPageEl.classList.add("hidden");
    buildQuiz();
}
// retreive and display high score if saved otherwise display 0
function retreiveHighScore() {
    var lastHighScore = localStorage.getItem(scoreName);
    var lastHighScoreArray = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        return retreivedHighScore = lastHighScoreArray[0].newScore;
    } else return 0;
}
// get question at currentQuestionIndex and display
var quizQuestionEl = document.getElementById("quiz-question");
var quizAnswersEl = document.getElementById("quiz-answers")
var currentQuestionIndex = 0;

function buildQuiz() {
    quizQuestionEl.classList.remove("hidden");
    var quizQuestion = questions[currentQuestionIndex].question;
    quizQuestionEl.textContent = quizQuestion;
    // use for loop to create a list of answers with clickable buttons for selected question
    var quizChoices = questions[currentQuestionIndex].choices;
    for (var i = 0; i < quizChoices.length; i++) {
        var quizChoice = quizChoices[i];
        var listItemEl = document.createElement("li");
        listItemEl.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;
        // give each answer a unique index so answer can be compared to correct answer
        selectButton.setAttribute("selectedIndex", i);
        // selected button will generate a click event
        selectButton.addEventListener("click", choiceClicked);
        listItemEl.appendChild(selectButton);
        // display all the answer buttons on the page
        quizAnswersEl.appendChild(listItemEl);
    }
}
// check if user entered right or wrong answer, display brief feedback message
function choiceClicked(event) {
    var buttonEl = event.target;
    if (buttonEl) {
        var buttonChosen = parseInt(buttonEl.getAttribute("selectedIndex"));
        var answerChoice = questions[currentQuestionIndex].answer;
        // if right increment score 
        if (buttonChosen === answerChoice) {
            feedbackEl.textContent = "CORRECT!";
            score += 5;
            // if wrong subtract time
        } else if (buttonChosen != answerChoice) {
            feedbackEl.textContent = "WRONG!";
            timer -= 10;
            // check if time has expired ( 0 or negative), endquiz if true otherwise display decremented time and continu
            if (timer <= 0) {
                roundOver();
            }
            countDownEl.textContent = timer;
        }
        // display feedback message for 0.5 seconds unless timer has reached 0 and quiz is over
        if (timer > 0) {
            feedbackEl.removeAttribute("class", "hidden");
            feedbackEl.setAttribute("class", "feedback")
            setTimeout(feedBackTimeout, 500);
        }
    }
}
var feedbackEl = document.getElementById("question-feedback");

function feedBackTimeout() {
    feedbackEl.setAttribute("class", "hidden");
    getNextQuestion();
}
// check timer again before incrementing questions array index
function getNextQuestion() {
    if (timer <= 0) {
        roundOver();
        return;
    } else {
        ++currentQuestionIndex;
    }
    // if index indicates no more questions quiz over, otherwise clear current question and build next question
    if (currentQuestionIndex >= questions.length) {
        roundOver();
    } else {
        clearAnswers();
        buildQuiz();
    }
}
// if quiz round over set timer to 0, display text round over message 
function roundOver() {
    timer = 0;
    countDownEl.textContent = "Round Over!";
    // clear starting timer, last question displayed, prepare to end quiz
    clearInterval(countDownTimer);
    clearAnswers();
    endQuiz();
}
// clear answer buttons by looping through choices, removing answer button at first index
// so as array shrinks, we are not trying to access a non existent index
function clearAnswers() {
    var count = quizAnswersEl.childElementCount;
    for (var i = 0; i < count; i++) {
        quizAnswersEl.removeChild(quizAnswersEl.childNodes[0]);
    }
}
var quizEndEl = document.getElementById("quiz-end");
var submitButton = document.getElementById("submit-button");
// hide question screen, unhide recording score screen and display final score
function endQuiz() {
    quizQuestionEl.classList.add("hidden");
    quizEndEl.classList.remove("hidden");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = score;
    // after user inputs initials and clicks submit button event to save score triggered
    submitButton.addEventListener("click", getInitials);
}
// user initials input is validated, if  this is first time quiz is played, an array is created to hold score data
// initials and score are saved to local strorage if user current score is higher than last recorded high score
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
            lastHighScoreArray.sort(function (a, b) {
                return -(a.newScore - b.newScore)
            });
            localStorage.setItem(scoreName, JSON.stringify(lastHighScoreArray));
        }
    }
    showResults();
}
// initials screen is hidden and results from local storage are displayed, 
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
// user now has choice to clear all scores in storage
function clearLocalStorage() {
    document.querySelector("#show-high-result").value = "";
    document.querySelector("#view-high-score").textContent = 0;
    localStorage.clear(lastHighScoreArray);
}
// and/or start quiz over, score and question index are reset
function startGameOver() {
    highResultEl.classList.add("hidden");
    startPageEl.classList.remove("hidden")
    initialsEl.value = "";
    currentQuestionIndex = 0;
    score = 0;
}
// event handlers for start, go back(start game over) and clear all scores from storage
var startBtn = document.querySelector("#start-button");
var goBackBtn = document.querySelector("#go-back");
var clearResultBtn = document.querySelector("#clear-result");
startBtn.addEventListener("click", countDown);
goBackBtn.addEventListener("click", startGameOver);
clearResultBtn.addEventListener("click", clearLocalStorage);